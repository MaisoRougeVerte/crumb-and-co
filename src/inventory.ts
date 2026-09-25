import type { Sku } from "./catalog.ts";
import type { InventoryStore } from "./inventory-store.ts";

export type InventoryReservation =
  | { ok: true }
  | { ok: false; reason: "out-of-stock" };

/** Reserves `quantity` units of `sku` in the store, or refuses when not enough is left. */
export async function reserveInventory(
  store: InventoryStore,
  sku: Sku,
  quantity: number,
): Promise<InventoryReservation> {
  const available = await store.get(sku);
  if (available < quantity) {
    return { ok: false, reason: "out-of-stock" };
  }
  await store.decrement(sku, quantity);
  return { ok: true };
}
