import { describe, expect, it } from "vitest";
import { createMemoryStore } from "../src/inventory-store.ts";
import { reserveStock } from "../src/stock.ts";

describe("reserveStock", () => {
  it("decrements the available quantity", async () => {
    const store = createMemoryStore({ croissant: 5 });
    expect(await reserveStock(store, "croissant", 2)).toEqual({ ok: true });
    expect(await store.get("croissant")).toBe(3);
  });

  it("refuses to reserve more than available", async () => {
    const store = createMemoryStore({ croissant: 1 });
    expect(await reserveStock(store, "croissant", 2)).toEqual({ ok: false, reason: "out-of-stock" });
    expect(await store.get("croissant")).toBe(1);
  });
});
