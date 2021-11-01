import { DrawBound } from './types';

interface MaxSize {
  maxWidth: number;
  maxHeight: number;
}

function getMaxSize(sw: number, sh: number, cw: number, ch: number): MaxSize {
  let maxWidth = cw;
  let maxHeight = ch;
  if (cw <= 0 && ch <= 0) {
    maxWidth = sw;
    maxHeight = sh;
  } else if (cw <= 0) {
    maxWidth = maxHeight;
  } else if (ch <= 0) {
    maxHeight = maxWidth;
  }
  return { maxWidth, maxHeight };
}

/**
 * 원본 사이즈(sw, sh)의 비율을 유지 하면서,
 * 컨테이너 사이즈(cw, ch) 내부에 들어가는 바운더리 정보를 반환.
 * - dx, dy 는 음수가 나올 수 없다.
 * - dw, dh 가 cw, ch 보다 클 수 없다.
 * @export
 * @param {number} sw 원본 width
 * @param {number} sh 원본 height
 * @param {number} cw 컨테이너 width
 * @param {number} ch 컨테이너 height
 * @returns {DrawBound}
 */
export function sizeToContain(sw: number, sh: number, cw: number, ch: number): DrawBound {
  const { maxWidth, maxHeight } = getMaxSize(sw, sh, cw, ch);
  let dx: number = 0;
  let dy: number = 0;
  let dw: number = 0;
  let dh: number = 0;
  const isLandscape: boolean = sh / ch <= sw / cw;
  if (isLandscape) {
    dw = Math.min(maxWidth, sw);
    dh = Math.floor((dw / sw) * sh);
  } else {
    dh = Math.min(maxHeight, sh);
    dw = Math.floor((dh / sh) * sw);
  }
  dx = (maxWidth - dw) * 0.5;
  dy = (maxHeight - dh) * 0.5;
  return { dx, dy, dw, dh };
}

/**
 * 원본 사이즈(sw, sh)의 비율을 유지 하면서,
 * 컨테이너 사이즈(cw, ch)를 가득 채우는 바운더리 정보를 반환.
 * - dx, dy 는 양수가 나올 수 없다.
 * - dw, dh 가 cw, ch 보다 작을 수 없다.
 * @export
 * @param {number} sw
 * @param {number} sh
 * @param {number} cw
 * @param {number} ch
 * @returns {DrawBound}
 */
export function sizeToCover(sw: number, sh: number, cw: number, ch: number): DrawBound {
  const { maxWidth, maxHeight } = getMaxSize(sw, sh, cw, ch);
  let dx: number = 0;
  let dy: number = 0;
  let dw: number = 0;
  let dh: number = 0;
  const expectRatio: number = maxWidth / maxHeight;
  const contentRatio: number = sw / sh;
  if (expectRatio < contentRatio) {
    dh = maxHeight;
    dw = maxHeight * contentRatio;
  } else {
    dw = maxWidth;
    dh = maxWidth / contentRatio;
  }
  dx = (maxWidth - dw) * 0.5;
  dy = (maxHeight - dh) * 0.5;
  return { dx, dy, dw, dh };
}
