import { describe, expect, it } from "vitest";
import { reserveInventory } from "../src/inventory.ts";
import { createMemoryStore } from "../src/inventory-store.ts";

describe("reserveInventory", () => {
  it("decrements the available quantity", async () => {
    const store = createMemoryStore({ croissant: 5 });
    expect(await reserveInventory(store, "croissant", 2)).toEqual({ ok: true });
    expect(await store.get("croissant")).toBe(3);
  });

  it("refuses to reserve more than available", async () => {
    const store = createMemoryStore({ croissant: 1 });
    expect(await reserveInventory(store, "croissant", 2)).toEqual({
      ok: false,
      reason: "out-of-stock",
    });
    expect(await store.get("croissant")).toBe(1);
  });

  it("leaves other products untouched", async () => {
    const store = createMemoryStore({ croissant: 2, "eclair-cafe": 4 });
    await reserveInventory(store, "croissant", 1);
    expect(await store.get("eclair-cafe")).toBe(4);
  });
});
