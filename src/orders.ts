import { type CartLine, priceCart } from "./cart.ts";
import type { Sku } from "./catalog.ts";
import { type Inventory, reserveStock } from "./stock.ts";

export type OrderRequest = {
  customerId: string;
  lines: readonly CartLine[];
};

export type PlacedOrder = {
  id: string;
  customerId: string;
  lines: readonly CartLine[];
  totalCents: number;
  placedAt: string;
};

export type OrderResult = { ok: true; order: PlacedOrder } | { ok: false; reason: "out-of-stock"; sku: Sku };

export type OrderDeps = {
  inventory: Inventory;
  now: () => Date;
  nextId: () => string;
};

export async function placeOrder(deps: OrderDeps, request: OrderRequest): Promise<OrderResult> {
  for (const line of request.lines) {
    const reservation = reserveStock(deps.inventory, line.sku, line.quantity);
    if (!reservation.ok) return { ok: false, reason: reservation.reason, sku: line.sku };
  }
  const quote = priceCart(request.lines);
  return {
    ok: true,
    order: {
      id: deps.nextId(),
      customerId: request.customerId,
      lines: request.lines,
      totalCents: quote.totalCents,
      placedAt: deps.now().toISOString(),
    },
  };
}
