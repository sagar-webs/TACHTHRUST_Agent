import { useSyncExternalStore } from "react";
import { productById } from "./catalog";

export type CartLine = { id: string; qty: number };
const KEY = "techthrust-cart";
const EMPTY: CartLine[] = [];

function load(): CartLine[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((l) => productById(l?.id) && l.qty > 0) : [];
  } catch {
    return [];
  }
}

let lines: CartLine[] = typeof window === "undefined" ? EMPTY : load();
const subs = new Set<() => void>();

function commit(next: CartLine[]) {
  lines = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  subs.forEach((f) => f());
}

export const cart = {
  get: () => lines,
  add(id: string, qty = 1) {
    if (!productById(id)) return false;
    const q = Math.max(1, Math.min(99, Math.floor(qty)));
    const found = lines.find((l) => l.id === id);
    commit(found ? lines.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + q) } : l)) : [...lines, { id, qty: q }]);
    return true;
  },
  setQty(id: string, qty: number) {
    commit(qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l)));
  },
  remove: (id: string) => commit(lines.filter((l) => l.id !== id)),
  clear: () => commit([]),
  summary: () => lines.map((l) => `${productById(l.id)?.name} x${l.qty}`),
};

export const useCart = () => useSyncExternalStore((cb) => (subs.add(cb), () => subs.delete(cb)), cart.get, () => EMPTY);
export const useCartCount = () => useCart().reduce((n, l) => n + l.qty, 0);
