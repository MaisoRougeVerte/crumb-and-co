import { type CartLine, priceCart } from "./cart.ts";
import type { Sku } from "./catalog.ts";
import type { InventoryStore } from "./inventory-store.ts";
import type { Logger } from "./logger.ts";
import { reserveStock } from "./stock.ts";

export type OrderRequest = {
  customerId: string;
  lines: readonly CartLine[];
  promoCode?: string;
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
  store: InventoryStore;
  now: () => Date;
  nextId: () => string;
  log: Logger;
};

export async function placeOrder(deps: OrderDeps, request: OrderRequest): Promise<OrderResult> {
  for (const line of request.lines) {
    const reservation = await reserveStock(deps.store, line.sku, line.quantity);
    if (!reservation.ok) return { ok: false, reason: reservation.reason, sku: line.sku };
    const left = await deps.store.get(line.sku);
    if (left < 0) deps.log({ level: "warn", event: "stock.negative", sku: line.sku, left });
  }
  const quote = priceCart(request.lines, request.promoCode);
  const order: PlacedOrder = {
    id: deps.nextId(),
    customerId: request.customerId,
    lines: request.lines,
    totalCents: quote.totalCents,
    placedAt: deps.now().toISOString(),
  };
  deps.log({ level: "info", event: "order.placed", ...order });
  return { ok: true, order };
}
