import type { Sku } from "./catalog.ts";
import { type OrderRequest, type OrderResult, placeOrder } from "./orders.ts";
import type { Inventory } from "./stock.ts";

export { priceCart } from "./cart.ts";
export { dailySales } from "./report.ts";
export type { Sku } from "./catalog.ts";
export type { OrderRequest, OrderResult, PlacedOrder } from "./orders.ts";

export type BakeryOptions = {
  stock: Partial<Record<Sku, number>>;
  now?: () => Date;
};

export type Bakery = {
  placeOrder: (request: OrderRequest) => Promise<OrderResult>;
  stockOf: (sku: Sku) => Promise<number>;
};

/** Public entry point of the shop backend. */
export function createBakery(options: BakeryOptions): Bakery {
  const inventory: Inventory = new Map(Object.entries(options.stock) as [Sku, number][]);
  let sequence = 0;
  const deps = {
    inventory,
    now: options.now ?? (() => new Date()),
    nextId: () => `ord_${String(++sequence).padStart(5, "0")}`,
  };
  return {
    placeOrder: (request) => placeOrder(deps, request),
    stockOf: async (sku) => inventory.get(sku) ?? 0,
  };
}
