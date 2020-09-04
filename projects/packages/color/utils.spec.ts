import { hexToRgb, rgbToHex, inRgbRange, inHexRange } from "./utils";

describe("point utils", () => {
  it("hexToRgb", () => {
    expect(hexToRgb("#ff0000")).toEqual([255, 0, 0]);
    expect(hexToRgb("#ffff00")).toEqual([255, 255, 0]);
    expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
    expect(hexToRgb("#12ff34")).toEqual([18, 255, 52]);
    expect(hexToRgb("#f00")).toEqual([255, 0, 0]);
    expect(hexToRgb("#ff0")).toEqual([255, 255, 0]);
    expect(hexToRgb("#fff")).toEqual([255, 255, 255]);
    expect(hexToRgb("#123")).toEqual([17, 34, 51]);
    expect(() => {
      hexToRgb('')
    }).toThrow();
  });

  it("rgbToHex", () => {
    expect(rgbToHex([255, 0, 0])).toBe("#ff0000");
    expect(rgbToHex([12, 0, 0])).toBe("#0c0000");
    expect(rgbToHex([12, 12, 12])).toBe("#0c0c0c");
    expect(rgbToHex([16, 17, 18])).toBe("#101112");
  });

  it("inRgbRange", () => {
    let min = [200, 0, 0];
    let max = [255, 255, 0];
    expect(inRgbRange(min, max, 0)).toEqual([200, 0, 0]);
    expect(inRgbRange(min, max, 0.25)).toEqual([214, 64, 0]);
    expect(inRgbRange(min, max, 0.5)).toEqual([228, 128, 0]);
    expect(inRgbRange(min, max, 0.75)).toEqual([241, 191, 0]);
    expect(inRgbRange(min, max, 1)).toEqual([255, 255, 0]);
    min = [0, 0, 0];
    max = [255, 200, 0];
    expect(inRgbRange(min, max, 0)).toEqual([0, 0, 0]);
    expect(inRgbRange(min, max, 0.25)).toEqual([64, 50, 0]);
    expect(inRgbRange(min, max, 0.5)).toEqual([128, 100, 0]);
    expect(inRgbRange(min, max, 0.75)).toEqual([191, 150, 0]);
    expect(inRgbRange(min, max, 1)).toEqual([255, 200, 0]);
  });

  it("inHexRange", () => {
    let min = "#c80000";
    let max = "#ffff00";
    expect(inHexRange(min, max, 0)).toEqual([200, 0, 0]);
    expect(inHexRange(min, max, 0.25)).toEqual([214, 64, 0]);
    expect(inHexRange(min, max, 0.5)).toEqual([228, 128, 0]);
    expect(inHexRange(min, max, 0.75)).toEqual([241, 191, 0]);
    expect(inHexRange(min, max, 1)).toEqual([255, 255, 0]);
    min = "#000000";
    max = "#ffc800";
    expect(inHexRange(min, max, 0)).toEqual([0, 0, 0]);
    expect(inHexRange(min, max, 0.25)).toEqual([64, 50, 0]);
    expect(inHexRange(min, max, 0.5)).toEqual([128, 100, 0]);
    expect(inHexRange(min, max, 0.75)).toEqual([191, 150, 0]);
    expect(inHexRange(min, max, 1)).toEqual([255, 200, 0]);
  });
});
