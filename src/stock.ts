import type { Sku } from "./catalog.ts";
import type { InventoryStore } from "./inventory-store.ts";

export type Reservation = { ok: true } | { ok: false; reason: "out-of-stock" };

export async function reserveStock(
  store: InventoryStore,
  sku: Sku,
  quantity: number,
): Promise<Reservation> {
  const available = await store.get(sku);
  if (available < quantity) return { ok: false, reason: "out-of-stock" };
  await store.decrement(sku, quantity);
  return { ok: true };
}
