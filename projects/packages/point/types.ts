/**
 * 교차 범위
 * @export
 * @interface IntersectRange
 */
export interface IntersectRange {
  start: number;
  end: number;
}

/**
 * 충돌 영역 (교집합)
 * @export
 * @interface CollisionBound
 */
export interface CollisionBound {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * 사이즈 정보
 * @export
 * @interface DrawBound
 */
export interface DrawBound {
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}
