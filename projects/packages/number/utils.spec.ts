import { isNumber } from "./utils";

describe("number utils", () => {
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
