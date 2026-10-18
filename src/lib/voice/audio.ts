// Mic capture (16 kHz PCM16) and playback (24 kHz PCM16) for Gemini Live.

const WORKLET = `
class Pcm extends AudioWorkletProcessor {
  process(inputs) {
    const ch = inputs[0][0];
    if (ch) {
      const out = new Int16Array(ch.length);
      for (let i = 0; i < ch.length; i++) out[i] = Math.max(-1, Math.min(1, ch[i])) * 0x7fff;
      this.port.postMessage(out.buffer, [out.buffer]);
    }
    return true;
  }
}
registerProcessor("pcm", Pcm);`;

const b64 = (buf: ArrayBuffer) => {
  let s = "";
  const u = new Uint8Array(buf);
  for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000));
  return btoa(s);
};

export class MicCapture {
  private ctx?: AudioContext;
  private stream?: MediaStream;
  private node?: AudioWorkletNode;

  async start(onChunk: (base64Pcm: string) => void) {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    this.ctx = new AudioContext({ sampleRate: 16000 });
    const url = URL.createObjectURL(new Blob([WORKLET], { type: "application/javascript" }));
    await this.ctx.audioWorklet.addModule(url);
    URL.revokeObjectURL(url);
    this.node = new AudioWorkletNode(this.ctx, "pcm");
    this.node.port.onmessage = (e) => onChunk(b64(e.data as ArrayBuffer));
    this.ctx.createMediaStreamSource(this.stream).connect(this.node);
  }

  stop() {
    this.node?.disconnect();
    this.stream?.getTracks().forEach((t) => t.stop());
    void this.ctx?.close();
  }
}

export class Player {
  private ctx = new AudioContext({ sampleRate: 24000 });
  private next = 0;
  private sources = new Set<AudioBufferSourceNode>();

  play(base64Pcm: string) {
    const bin = atob(base64Pcm);
    const i16 = new Int16Array(bin.length / 2);
    for (let i = 0; i < i16.length; i++) i16[i] = (bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8)) << 16 >> 16;
    const buf = this.ctx.createBuffer(1, i16.length, 24000);
    const f = buf.getChannelData(0);
    for (let i = 0; i < i16.length; i++) f[i] = i16[i] / 0x8000;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(this.ctx.destination);
    this.next = Math.max(this.next, this.ctx.currentTime + 0.02);
    src.start(this.next);
    this.next += buf.duration;
    this.sources.add(src);
    src.onended = () => this.sources.delete(src);
  }

  /** Milliseconds of queued audio still to be played. */
  remainingMs() {
    return Math.max(0, (this.next - this.ctx.currentTime) * 1000);
  }

  /** Barge-in: drop everything queued. */
  interrupt() {
    this.sources.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } });
    this.sources.clear();
    this.next = 0;
  }

  close() {
    this.interrupt();
    void this.ctx.close();
  }
}
