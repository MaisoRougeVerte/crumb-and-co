import { catalog, type Sku } from "./catalog.ts";

export type CartLine = {
  sku: Sku;
  quantity: number;
};

export type Quote = {
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
};

export function priceCart(lines: readonly CartLine[]): Quote {
  const subtotalCents = lines.reduce(
    (sum, line) => sum + catalog[line.sku].priceCents * line.quantity,
    0,
  );
  return { subtotalCents, discountCents: 0, totalCents: subtotalCents };
}
