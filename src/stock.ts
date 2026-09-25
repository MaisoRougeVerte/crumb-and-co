import type { Sku } from "./catalog.ts";

export type Inventory = Map<Sku, number>;

export type Reservation = { ok: true } | { ok: false; reason: "out-of-stock" };

export function reserveStock(inventory: Inventory, sku: Sku, quantity: number): Reservation {
  const available = inventory.get(sku) ?? 0;
  if (available < quantity) return { ok: false, reason: "out-of-stock" };
  inventory.set(sku, available - quantity);
  return { ok: true };
}
