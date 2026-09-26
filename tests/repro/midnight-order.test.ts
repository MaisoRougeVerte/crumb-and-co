import { describe, expect, it } from "vitest";
import { dailySales } from "../../src/index.ts";
import type { PlacedOrder } from "../../src/index.ts";

function order(id: string, placedAt: string, totalCents: number): PlacedOrder {
  return { id, customerId: "cust_0001", lines: [], totalCents, placedAt };
}

describe("dailySales midnight boundary", () => {
  it("orders after UTC 22:00 belong to the next Paris day not the current UTC day", () => {
    // Paris is UTC+2 in September (CEST).
    // 2026-09-19T22:04:51Z = 2026-09-20T00:04:51+02:00 → belongs to Sunday 2026-09-20
    // 2026-09-19T21:47:13Z = 2026-09-19T23:47:13+02:00 → belongs to Saturday 2026-09-19
    const orders: PlacedOrder[] = [
      order("ord_saturday", "2026-09-19T21:47:13.569Z", 840),  // 23:47 Paris → Saturday
      order("ord_sunday_1",  "2026-09-19T22:04:51.565Z", 730),  // 00:04 Paris → Sunday
      order("ord_sunday_2",  "2026-09-19T22:18:36.708Z", 730),  // 00:18 Paris → Sunday
    ];
    const totals = dailySales(orders);
    // The Saturday total must NOT include the after-midnight orders
    expect(totals.get("2026-09-19")).toBe(840);
    expect(totals.get("2026-09-20")).toBe(1460);
  });
});
