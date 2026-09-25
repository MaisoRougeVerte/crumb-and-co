import type { PlacedOrder } from "./orders.ts";

// The shop closes its books on Paris days, not UTC days.
const parisDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function dayOf(order: PlacedOrder): string {
  return parisDay.format(new Date(order.placedAt));
}

/** Total sales in cents per Paris calendar day, formatted YYYY-MM-DD. */
export function dailySales(orders: readonly PlacedOrder[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const order of orders) {
    const day = dayOf(order);
    totals.set(day, (totals.get(day) ?? 0) + order.totalCents);
  }
  return totals;
}
