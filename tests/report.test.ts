import { describe, expect, it } from "vitest";
import { dailySales, type PlacedOrder } from "../src/index.ts";

function order(id: string, placedAt: string, totalCents: number): PlacedOrder {
  return { id, customerId: "cust_0001", lines: [], totalCents, placedAt };
}

describe("dailySales", () => {
  it("sums the orders of each day", () => {
    const totals = dailySales([
      order("ord_1", "2026-09-17T07:30:00.000Z", 350),
      order("ord_2", "2026-09-17T12:10:00.000Z", 120),
      order("ord_3", "2026-09-18T09:00:00.000Z", 450),
    ]);
    expect(Object.fromEntries(totals)).toEqual({ "2026-09-17": 470, "2026-09-18": 450 });
  });
});
