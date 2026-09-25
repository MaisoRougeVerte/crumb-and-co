import { catalog, type Sku } from "./catalog.ts";
import { discountPercent } from "./promo.ts";

export type CartLine = {
  sku: Sku;
  quantity: number;
};

export type Quote = {
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
};

export function priceCart(lines: readonly CartLine[], promoCode?: string): Quote {
  // Work in euros once instead of converting every line, then round at the end.
  const subtotal = lines.reduce(
    (sum, line) => sum + (catalog[line.sku].priceCents / 100) * line.quantity,
    0,
  );
  const total = subtotal * (1 - discountPercent(promoCode) / 100);
  const subtotalCents = Math.round(subtotal * 100);
  const totalCents = Math.round(total * 100);
  return { subtotalCents, discountCents: subtotalCents - totalCents, totalCents };
}
