import { TTLCache } from "./TTLCache";

function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), duration);
  });
}

describe("A", () => {
  let ttlCache: TTLCache;

  beforeEach(() => {
    ttlCache = new TTLCache();
  });

  it("expired", async () => {
    ttlCache.set("A", "myValue1", 0);
    ttlCache.set("B", "myValue2", 100);
    ttlCache.set("C", "myValue3", 200);
    expect(ttlCache.expired("unknown-k1")).toBe(true);
    expect(ttlCache.expired("unknown-k2")).toBe(true);
    expect(ttlCache.expired("A")).toBe(true);
    expect(ttlCache.expired("B")).toBe(false);
    expect(ttlCache.expired("C")).toBe(false);
    await delay(101);
    expect(ttlCache.expired("unknown-k1")).toBe(true);
    expect(ttlCache.expired("unknown-k2")).toBe(true);
    expect(ttlCache.expired("A")).toBe(true);
    expect(ttlCache.expired("B")).toBe(true);
    expect(ttlCache.expired("C")).toBe(false);
  });

  it("get", async () => {
    ttlCache.set("A", "myValue1", 0);
    ttlCache.set("B", "myValue2", 100);
    ttlCache.set("C", "myValue3", 200);
    expect(ttlCache.get("unknown-k1")).toBe(undefined);
    expect(ttlCache.get("unknown-k2")).toBe(undefined);
    expect(ttlCache.get("A")).toBe(undefined);
    expect(ttlCache.get("B")).toBe("myValue2");
    expect(ttlCache.get("C")).toBe("myValue3");
    await delay(101);
    expect(ttlCache.get("unknown-k1")).toBe(undefined);
    expect(ttlCache.get("unknown-k2")).toBe(undefined);
    expect(ttlCache.get("A")).toBe(undefined);
    expect(ttlCache.get("B")).toBe(undefined);
    expect(ttlCache.get("C")).toBe("myValue3");
  });

  it("has", async () => {
    ttlCache.set("A", "myValue1", 0);
    ttlCache.set("B", "myValue2", 100);
    ttlCache.set("C", "myValue3", 200);
    expect(ttlCache.has("unknown-k1")).toBe(false);
    expect(ttlCache.has("unknown-k2")).toBe(false);
    expect(ttlCache.has("A")).toBe(false);
    expect(ttlCache.has("B")).toBe(true);
    expect(ttlCache.has("C")).toBe(true);
    await delay(101);
    expect(ttlCache.has("unknown-k1")).toBe(false);
    expect(ttlCache.has("unknown-k2")).toBe(false);
    expect(ttlCache.has("A")).toBe(false);
    expect(ttlCache.has("B")).toBe(false);
    expect(ttlCache.has("C")).toBe(true);
  });

  it("remove", async () => {
    ttlCache.set("A", "myValue1", 100);
    ttlCache.set("B", "myValue2", 100);
    ttlCache.set("C", "myValue3", 200);
    expect(ttlCache.has("A")).toBe(true);
    expect(ttlCache.has("B")).toBe(true);
    expect(ttlCache.has("C")).toBe(true);
    ttlCache.remove("A");
    ttlCache.remove("B");
    ttlCache.remove("C");
    expect(ttlCache.has("A")).toBe(false);
    expect(ttlCache.has("B")).toBe(false);
    expect(ttlCache.has("C")).toBe(false);
  });

  it("toJson", async () => {
    ttlCache.set("A", "myValue1", 0);
    ttlCache.set("B", "myValue2", 100);
    ttlCache.set("C", "myValue3", 200);
    expect(ttlCache.toJson()).toEqual({ B: "myValue2", C: "myValue3" });
    await delay(101);
    expect(ttlCache.toJson()).toEqual({ C: "myValue3" });
  });
});
