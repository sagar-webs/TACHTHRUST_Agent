import { useSyncExternalStore } from "react";

export type Pitch = { title: string; tagline: string; bullets: string[]; cta?: string };
export type Personalization = { business_name?: string; industry?: string; headline: string; subheadline?: string };
export type Presentation = { active: boolean; index: number };
export type Lead = { name: string; ts: number };
type State = {
  pitch: Pitch | null;
  personalization: Personalization | null;
  presentation: Presentation;
  presentRequest: number; // timestamp; bump to ask the widget to start the narrated presentation
  lead: Lead | null; // set after a lead form is submitted; the widget reacts once
};

let state: State = { pitch: null, personalization: null, presentation: { active: false, index: 0 }, presentRequest: 0, lead: null };
const subs = new Set<() => void>();

export const voiceUi = {
  set(patch: Partial<State>) {
    state = { ...state, ...patch };
    subs.forEach((f) => f());
  },
  get: () => state,
};

export const useVoiceUi = () =>
  useSyncExternalStore((cb) => (subs.add(cb), () => subs.delete(cb)), voiceUi.get, voiceUi.get);
