/**
 * @packageDocumentation
 * @module point
 */

/**
 * 축 교차점 비교
 * one 의 { start, end } 와 other 의 { start, end } 를 비교
 * @param {IntersectRange} one
 * @param {IntersectRange} other
 * @returns {IntersectRange}
 * @example
 * intersect({ start: 0, end: 100 }, { start: 20, end: 120 }); // { start: 20,end: 100 }
 * intersect({ start: 120, end: 200 }, { start: 20, end: 120 }); // { start: 0, end: 0 }
 */
export function intersect(one: IntersectRange, other: IntersectRange): IntersectRange {
  if (other.end <= one.start || one.end <= other.start) {
    return { start: 0, end: 0 };
  }
  const start = Math.max(one.start, other.start);
  const end = Math.min(one.end, other.end);
  return { start, end };
}

/**
 * intersect 를 이용해 축 hitTest
 * @param {IntersectRange} one
 * @param {IntersectRange} other
 * @returns {boolean}
 * @example
 * isIntersect({ start: 0, end: 100 }, { start: 20, end: 120 }); // true
 * isIntersect({ start: 120, end: 200 }, { start: 20, end: 120 }); // true
 */
export function isIntersect(one: IntersectRange, other: IntersectRange): boolean {
  const sect = intersect(one, other);
  return sect.start !== 0 || sect.end !== 0;
}

/**
 * intersect 를 이용해 면 hitTest
 * @param {CollisionBound} one
 * @param {CollisionBound} other
 * @returns {boolean}
 * @example
 * let one = { x: 0, y: 0, w: 100, h: 100 };
 * let two = { x: 50, y: 50, w: 100, h: 100 };
 * isCollision(one, two); // true
 * one = { x: 0, y: 0, w: 100, h: 100 };
 * two = { x: 100, y: 100, w: 100, h: 100 };
 * isCollision(one, two)); // false
 */
export function isCollision(one: CollisionBound, other: CollisionBound): boolean {
  const hitX = isIntersect({ start: one.x, end: one.x + one.w }, { start: other.x, end: other.x + other.w });
  const hitY = isIntersect({ start: one.y, end: one.y + one.h }, { start: other.y, end: other.y + other.h });
  return hitX && hitY;
}

interface IntersectRange {
  start: number;
  end: number;
}

interface CollisionBound {
  x: number;
  y: number;
  w: number;
  h: number;
}
