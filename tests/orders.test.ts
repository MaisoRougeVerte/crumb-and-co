import { describe, expect, it } from "vitest";
import { createBakery } from "../src/index.ts";

describe("placeOrder", () => {
  it("reserves stock and returns the priced order", async () => {
    const bakery = createBakery({
      stock: { croissant: 3 },
      now: () => new Date("2026-09-10T08:00:00Z"),
    });
    const result = await bakery.placeOrder({
      customerId: "cust_0001",
      lines: [{ sku: "croissant", quantity: 2 }],
    });
    expect(result).toMatchObject({ ok: true, order: { totalCents: 230 } });
    expect(await bakery.stockOf("croissant")).toBe(1);
  });

  it("rejects an order when stock runs out", async () => {
    const bakery = createBakery({ stock: { "baguette-tradition": 1 } });
    await bakery.placeOrder({ customerId: "cust_0001", lines: [{ sku: "baguette-tradition", quantity: 1 }] });
    const second = await bakery.placeOrder({
      customerId: "cust_0002",
      lines: [{ sku: "baguette-tradition", quantity: 1 }],
    });
    expect(second).toEqual({ ok: false, reason: "out-of-stock", sku: "baguette-tradition" });
  });
});

describe("order logs", () => {
  it("logs every placed order", async () => {
    const entries: unknown[] = [];
    const bakery = createBakery({ stock: { croissant: 2 }, log: (entry) => entries.push(entry) });
    await bakery.placeOrder({ customerId: "cust_0003", lines: [{ sku: "croissant", quantity: 1 }] });
    expect(entries).toMatchObject([{ level: "info", event: "order.placed", customerId: "cust_0003" }]);
  });
});
