import { intersect, isIntersect } from "./utils";

describe("point utils", () => {
  it("intersect", () => {
    expect(intersect({ start: 0, end: 100 }, { start: 20, end: 120 })).toEqual({
      start: 20,
      end: 100,
    });
    expect(
      intersect({ start: 120, end: 200 }, { start: 20, end: 120 })
    ).toEqual({
      start: 0,
      end: 0,
    });
  });
  it("isIntersect", () => {
    expect(isIntersect({ start: 0, end: 100 }, { start: 20, end: 120 })).toBe(
      true
    );
    expect(isIntersect({ start: 120, end: 200 }, { start: 20, end: 120 })).toBe(
      false
    );
  });
});
