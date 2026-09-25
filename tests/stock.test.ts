import { describe, expect, it } from "vitest";
import { type Inventory, reserveStock } from "../src/stock.ts";

describe("reserveStock", () => {
  it("decrements the available quantity", () => {
    const inventory: Inventory = new Map([["croissant", 5]]);
    expect(reserveStock(inventory, "croissant", 2)).toEqual({ ok: true });
    expect(inventory.get("croissant")).toBe(3);
  });

  it("refuses to reserve more than available", () => {
    const inventory: Inventory = new Map([["croissant", 1]]);
    expect(reserveStock(inventory, "croissant", 2)).toEqual({ ok: false, reason: "out-of-stock" });
    expect(inventory.get("croissant")).toBe(1);
  });
});
