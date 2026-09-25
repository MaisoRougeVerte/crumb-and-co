import type { Sku } from "./catalog.ts";

/** Stock storage. Async because production stock lives in the shop database. */
export type InventoryStore = {
  get: (sku: Sku) => Promise<number>;
  decrement: (sku: Sku, quantity: number) => Promise<void>;
};

export function createMemoryStore(initial: Partial<Record<Sku, number>>): InventoryStore {
  const levels = new Map(Object.entries(initial) as [Sku, number][]);
  return {
    get: async (sku) => levels.get(sku) ?? 0,
    decrement: async (sku, quantity) => {
      levels.set(sku, (levels.get(sku) ?? 0) - quantity);
    },
  };
}
