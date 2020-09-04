import { intersect, isIntersect, isCollision } from "./utils";

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

  it("isCollision", () => {
    let one = { x: 0, y: 0, w: 100, h: 100 };
    let two = { x: 50, y: 50, w: 100, h: 100 };
    expect(isCollision(one, two)).toBe(true);
    one = { x: 0, y: 0, w: 100, h: 100 };
    two = { x: 99, y: 99, w: 100, h: 100 };
    expect(isCollision(one, two)).toBe(true);
    one = { x: 0, y: 0, w: 100, h: 100 };
    two = { x: 100, y: 100, w: 100, h: 100 };
    expect(isCollision(one, two)).toBe(false);
    one = { x: 0, y: 0, w: 100, h: 100 };
    two = { x: 150, y: 150, w: 100, h: 100 };
    expect(isCollision(one, two)).toBe(false);
    one = { x: 100, y: 100, w: 100, h: 100 };
    two = { x: 50, y: 50, w: 50, h: 50 };
    expect(isCollision(one, two)).toBe(false);
    one = { x: 100, y: 100, w: 100, h: 100 };
    two = { x: 50, y: 50, w: 100, h: 100 };
    expect(isCollision(one, two)).toBe(true);
  });
});
