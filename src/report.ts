import type { PlacedOrder } from "./orders.ts";

// placedAt is already an ISO string, so its first ten characters are the day.
export function dayOf(order: PlacedOrder): string {
  return order.placedAt.slice(0, 10);
}

/** Total sales in cents per calendar day, formatted YYYY-MM-DD. */
export function dailySales(orders: readonly PlacedOrder[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const order of orders) {
    const day = dayOf(order);
    totals.set(day, (totals.get(day) ?? 0) + order.totalCents);
  }
  return totals;
}
