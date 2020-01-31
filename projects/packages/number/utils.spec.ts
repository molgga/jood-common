import { isNumber, randomRangeInt, randomRangeFloat } from "./utils";

describe("number utils", () => {
  it("randomRangeInt", () => {
    for (let i = 0; i < 100; i++) {
      const start = i * 10;
      const end = i * 100;
      const random = randomRangeInt(start, end);
      expect(start <= random && random <= end).toBe(true);
    }
  });

  it("randomRangeFloat", () => {
    for (let i = 0; i < 100; i++) {
      const start = i * 10;
      const end = i * 100;
      const random = randomRangeFloat(start, end);
      expect(start <= random && random <= end).toBe(true);
    }
  });

  it("isNumber", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber("0")).toBe(true);
    expect(isNumber("1")).toBe(true);
    expect(isNumber(" 1 ")).toBe(true);
    expect(isNumber("1e+10")).toBe(true);
    expect(isNumber(" 1abc ")).toBe(false);
    expect(isNumber("  ")).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(Date)).toBe(false);
    expect(isNumber(new Date())).toBe(true);
  });
});
