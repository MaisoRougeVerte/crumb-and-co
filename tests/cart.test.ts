import { describe, expect, it } from "vitest";
import { priceCart } from "../src/cart.ts";

describe("priceCart", () => {
  it("sums line prices in cents", () => {
    const quote = priceCart([
      { sku: "croissant", quantity: 2 },
      { sku: "tarte-citron", quantity: 1 },
    ]);
    expect(quote.totalCents).toBe(680);
  });

  it("prices an empty cart at zero", () => {
    expect(priceCart([]).totalCents).toBe(0);
  });
});

describe("priceCart with a promo code", () => {
  it("applies a percentage discount", () => {
    const quote = priceCart([{ sku: "croissant", quantity: 2 }], "BIENVENUE10");
    expect(quote).toEqual({ subtotalCents: 230, discountCents: 23, totalCents: 207 });
  });

  it("ignores unknown codes", () => {
    expect(priceCart([{ sku: "croissant", quantity: 2 }], "NOPE").totalCents).toBe(230);
  });
});
