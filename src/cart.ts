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
  const subtotalCents = lines.reduce(
    (sum, line) => sum + catalog[line.sku].priceCents * line.quantity,
    0,
  );
  // Round the discount itself to the nearest cent so the receipt always adds up.
  const discountCents = Math.round((subtotalCents * discountPercent(promoCode)) / 100);
  return { subtotalCents, discountCents, totalCents: subtotalCents - discountCents };
}
