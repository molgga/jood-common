import {
  isNumber,
  randomRangeInt,
  randomRangeFloat,
  getRandomizer
} from "./utils";

describe("number utils", () => {
  it("randomRangeInt", () => {
    for (let i = 0; i < 100; i++) {
      const start = i * 10;
      const end = i * 100;
      const random = randomRangeInt(start, end);
      expect(start <= random && random <= end).toBe(true);
    }
    expect(randomRangeInt(10, 1)).toBe(0);
    expect(randomRangeInt(10, 5)).toBe(0);
    expect(randomRangeInt(10, 10)).toBe(10);
  });

  it("randomRangeFloat", () => {
    for (let i = 0; i < 100; i++) {
      const start = i * 10;
      const end = i * 100;
      const random = randomRangeFloat(start, end);
      expect(start <= random && random <= end).toBe(true);
    }
    expect(randomRangeFloat(10, 1)).toBe(0);
    expect(randomRangeFloat(10, 5)).toBe(0);
    expect(randomRangeFloat(10, 10)).toBe(10);
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

  it("getRandomizer", () => {
    expect(getRandomizer()).toBe(Math.random);
    expect(getRandomizer(1)).not.toBe(Math.random);
    expect(typeof getRandomizer(1)).toBe("function");

    const mathRandom = getRandomizer();
    const seedRandom = getRandomizer(1);
    for (let i = 0; i < 10; i++) {
      const ran1 = mathRandom();
      expect(0 <= ran1 && ran1 <= 1).toBe(true);

      const ran2 = seedRandom();
      expect(0 <= ran2 && ran2 <= 1).toBe(true);
    }
  });
});
