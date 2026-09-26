import { expect, it } from "vitest";
import { priceCart } from "../../src/cart.ts";

it("promo code BIENVENUE10 gives 229 cents on a 255-cent cart", () => {
  // baguette-tradition 120¢ + pain-au-chocolat 135¢ = 255¢ subtotal
  // 10% discount: 255 * 10% = 25.5 → rounds to 26; 255 - 26 = 229
  const quote = priceCart(
    [
      { sku: "baguette-tradition", quantity: 1 },
      { sku: "pain-au-chocolat", quantity: 1 },
    ],
    "BIENVENUE10",
  );
  expect(quote.subtotalCents).toBe(255);
  expect(quote.totalCents).toBe(229);
});
