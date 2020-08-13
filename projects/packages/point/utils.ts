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
export function intersect(
  one: IntersectRange,
  other: IntersectRange
): IntersectRange {
  if (one.start >= other.end || other.start >= one.end) {
    return { start: 0, end: 0 };
  }
  const start = Math.max(one.start, other.start);
  const end = Math.min(one.end, other.end);
  if (end - start <= 0) {
    return { start: 0, end: 0 };
  }
  return { start, end };
}

/**
 * intersect 를 이용해 hitTest
 * @param {IntersectRange} one
 * @param {IntersectRange} other
 * @returns {boolean}
 * @example
 * isIntersect({ start: 0, end: 100 }, { start: 20, end: 120 }); // true
 * isIntersect({ start: 120, end: 200 }, { start: 20, end: 120 }); // true
 */
export function isIntersect(
  one: IntersectRange,
  other: IntersectRange
): boolean {
  const sect = intersect(one, other);
  return sect.start !== 0 || sect.end !== 0;
}

interface IntersectRange {
  start: number;
  end: number;
}
