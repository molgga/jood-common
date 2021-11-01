import { 
  intersect, 
  isIntersect, 
  isCollision, 
  sizeToContain,
  sizeToCover,
} from "./utils";

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

  it("sizeToContain", () => {
    // console.log(sizeToContain(100, 100, 200, 200));
    // console.log(sizeToContain(200, 100, 200, 200));
    // console.log(sizeToContain(300, 100, 200, 200));
    // console.log(sizeToContain(300, 200, 200, 200));
    // console.log(sizeToContain(300, 300, 200, 200));

    // console.log(sizeToContain(100, 100, 100, 200));
    // console.log(sizeToContain(200, 100, 100, 200));
    // console.log(sizeToContain(300, 100, 100, 200));
    // console.log(sizeToContain(300, 200, 100, 200));
    // console.log(sizeToContain(300, 300, 100, 200));
    
    // console.log(sizeToContain(100, 100, 200, 100));
    // console.log(sizeToContain(200, 100, 200, 100));
    // console.log(sizeToContain(300, 100, 200, 100));
    // console.log(sizeToContain(300, 200, 200, 100));
    // console.log(sizeToContain(300, 300, 200, 100));
    expect(sizeToContain(100, 100, 200, 200)).toEqual({ dx: 50, dy: 50, dw: 100, dh: 100 });
    expect(sizeToContain(200, 100, 200, 200)).toEqual({ dx: 0, dy: 50, dw: 200, dh: 100 });
    expect(sizeToContain(300, 100, 200, 200)).toEqual({ dx: 0, dy: 67, dw: 200, dh: 66 });
    expect(sizeToContain(300, 200, 200, 200)).toEqual({ dx: 0, dy: 33.5, dw: 200, dh: 133 });
    expect(sizeToContain(300, 300, 200, 200)).toEqual({ dx: 0, dy: 0, dw: 200, dh: 200 });

    expect(sizeToContain(100, 100, 100, 200)).toEqual({ dx: 0, dy: 50, dw: 100, dh: 100 });
    expect(sizeToContain(200, 100, 100, 200)).toEqual({ dx: 0, dy: 75, dw: 100, dh: 50 });
    expect(sizeToContain(300, 100, 100, 200)).toEqual({ dx: 0, dy: 83.5, dw: 100, dh: 33 });
    expect(sizeToContain(300, 200, 100, 200)).toEqual({ dx: 0, dy: 67, dw: 100, dh: 66 });
    expect(sizeToContain(300, 300, 100, 200)).toEqual({ dx: 0, dy: 50, dw: 100, dh: 100 });

    expect(sizeToContain(100, 100, 200, 100)).toEqual({ dx: 50, dy: 0, dw: 100, dh: 100 });
    expect(sizeToContain(200, 100, 200, 100)).toEqual({ dx: 0, dy: 0, dw: 200, dh: 100 });
    expect(sizeToContain(300, 100, 200, 100)).toEqual({ dx: 0, dy: 17, dw: 200, dh: 66 });
    expect(sizeToContain(300, 200, 200, 100)).toEqual({ dx: 25, dy: 0, dw: 150, dh: 100 });
    expect(sizeToContain(300, 300, 200, 100)).toEqual({ dx: 50, dy: 0, dw: 100, dh: 100 });
  });

  it("sizeToCover", () => {
    // console.log(sizeToCover(100, 100, 200, 200));
    // console.log(sizeToCover(200, 100, 200, 200));
    // console.log(sizeToCover(300, 100, 200, 200));
    // console.log(sizeToCover(300, 200, 200, 200));
    // console.log(sizeToCover(300, 300, 200, 200));

    // console.log(sizeToCover(100, 100, 100, 200));
    // console.log(sizeToCover(200, 100, 100, 200));
    // console.log(sizeToCover(300, 100, 100, 200));
    // console.log(sizeToCover(300, 200, 100, 200));
    // console.log(sizeToCover(300, 300, 100, 200));

    // console.log(sizeToCover(100, 100, 200, 100));
    // console.log(sizeToCover(200, 100, 200, 100));
    // console.log(sizeToCover(300, 100, 200, 100));
    // console.log(sizeToCover(300, 200, 200, 100));
    // console.log(sizeToCover(300, 300, 200, 100));
    expect(sizeToCover(100, 100, 200, 200)).toEqual({ dx: 0, dy: 0, dw: 200, dh: 200 });
    expect(sizeToCover(200, 100, 200, 200)).toEqual({ dx: -100, dy: 0, dw: 400, dh: 200 });
    expect(sizeToCover(300, 100, 200, 200)).toEqual({ dx: -200, dy: 0, dw: 600, dh: 200 });
    expect(sizeToCover(300, 200, 200, 200)).toEqual({ dx: -50, dy: 0, dw: 300, dh: 200 });
    expect(sizeToCover(300, 300, 200, 200)).toEqual({ dx: 0, dy: 0, dw: 200, dh: 200 });

    expect(sizeToCover(100, 100, 100, 200)).toEqual({ dx: -50, dy: 0, dw: 200, dh: 200 });
    expect(sizeToCover(200, 100, 100, 200)).toEqual({ dx: -150, dy: 0, dw: 400, dh: 200 });
    expect(sizeToCover(300, 100, 100, 200)).toEqual({ dx: -250, dy: 0, dw: 600, dh: 200 });
    expect(sizeToCover(300, 200, 100, 200)).toEqual({ dx: -100, dy: 0, dw: 300, dh: 200 });
    expect(sizeToCover(300, 300, 100, 200)).toEqual({ dx: -50, dy: 0, dw: 200, dh: 200 });

    expect(sizeToCover(100, 100, 200, 100)).toEqual({ dx: 0, dy: -50, dw: 200, dh: 200 });
    expect(sizeToCover(200, 100, 200, 100)).toEqual({ dx: 0, dy: 0, dw: 200, dh: 100 });
    expect(sizeToCover(300, 100, 200, 100)).toEqual({ dx: -50, dy: 0, dw: 300, dh: 100 });
    // expect(sizeToCover(300, 200, 200, 100)).toEqual({ dx: 0, dy: -16.666..., dw: 200, dh: 133.333... });
    expect(sizeToCover(300, 300, 200, 100)).toEqual({ dx: 0, dy: -50, dw: 200, dh: 200 });
  });
});
