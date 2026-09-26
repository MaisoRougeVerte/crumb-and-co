import { describe, expect, it } from "vitest";
import { createBakery } from "../../src/index.ts";

describe("framed-commit", () => {
  it("concurrent orders cannot both succeed on the last baguette", async () => {
    const bakery = createBakery({
      stock: { "baguette-tradition": 1 },
    });

    // Fire two concurrent orders for the last baguette at the same time.
    const [r1, r2] = await Promise.all([
      bakery.placeOrder({ customerId: "cust_0193", lines: [{ sku: "baguette-tradition", quantity: 1 }] }),
      bakery.placeOrder({ customerId: "cust_0288", lines: [{ sku: "baguette-tradition", quantity: 1 }] }),
    ]);

    // At most one should succeed; the other must be rejected as out-of-stock.
    const successes = [r1, r2].filter((r) => r.ok);
    const failures = [r1, r2].filter((r) => !r.ok);

    expect(successes).toHaveLength(1);
    expect(failures).toHaveLength(1);

    // Stock must never go negative.
    const stock = await bakery.stockOf("baguette-tradition");
    expect(stock).toBeGreaterThanOrEqual(0);
  });
});
