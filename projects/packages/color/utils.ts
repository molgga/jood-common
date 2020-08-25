/**
 * @packageDocumentation
 * @module color
 */

/**
 * hex('#ff0000') 컬러값을 rgb([255,0,0]) 형태로 변환 합니다.
 * @export
 * @param {string} hex 변환할 컬러값
 * @returns {number[]}
 * @example
 * console.log(hexToRgb("#ff0000")); // [255, 0, 0]
 * console.log(hexToRgb("#12ff34")); // [18, 255, 52]
 */
export function hexToRgb(hex: string): number[] {
  const hexColor = hex.replace(/^#/, '');
  const len = hexColor.length;
  let arr = [];
  if (len !== 3 && len !== 6) {
    throw new Error('not avaliable (avaliable ex: #f00, #ff000)');
  } else {
    if (len === 3) {
      arr = hexColor.split('').map((color) => '' + color + color);
    } else if (len === 6) {
      arr = [hexColor.substring(0, 2), hexColor.substring(2, 4), hexColor.substring(4, 6)];
    }
  }
  return arr.map((color) => {
    return parseInt(color, 16);
  });
}

/**
 * rgb([255,0,0]) 컬러값을 hex(#ff0000) 형태로 변환합니다.
 * @export
 * @param {number[]} rgb 변환할 컬러값
 * @returns {string}
 * @example
 * console.log(rgbToHex([255, 0, 0])); // "#ff0000"
 * console.log(rgbToHex([12, 0, 0])); // "#0c0000"
 */
export function rgbToHex(rgb: number[]): string {
  const hexArr = rgb.map((color) => {
    const hex = color.toString(16);
    return color < 16 ? '0' + hex : hex;
  });
  return '#' + hexArr.join('');
}

/**
 * minRgb 과 maxRgb 값 사이의 percent 에 해당하는 rgb 값을 반환 합니다.
 * @export
 * @param {number[]} minRgb
 * @param {number[]} maxRgb
 * @param {number} percent
 * @returns {number[]}
 * @example
 * const min = [200, 0, 0];
 * const max = [255, 255, 0];
 * console.log(inRgbRange(min, max, 0)); // [200, 0, 0]
 * console.log(inRgbRange(min, max, 0.25)); // [214, 64, 0]
 * console.log(inRgbRange(min, max, 0.5)); // [228, 128, 0]
 * console.log(inRgbRange(min, max, 0.75)); // [241, 191, 0]
 * console.log(inRgbRange(min, max, 1)); // [255, 255, 0]
 */
export function inRgbRange(minRgb: number[], maxRgb: number[], percent: number): number[] {
  const perColor = 1 - percent;
  const colors = maxRgb.map((max, index) => {
    const min = minRgb[index];
    return Math.round(max - (max - min) * perColor);
  });
  return colors;
}

/**
 * minHex 와 maxHex 값 사이의 percent 에 해당하는 rgb 값을 반환 합니다.
 * @export
 * @param {string} minHex
 * @param {string} maxHex
 * @param {number} percent
 * @returns {number[]}
 * const min = "#c80000";
 * const max = "#ffff00";
 * console.log(inHexRange(min, max, 0)); // [200, 0, 0]
 * console.log(inHexRange(min, max, 0.25)); // [214, 64, 0]
 * console.log(inHexRange(min, max, 0.5)); // [228, 128, 0]
 * console.log(inHexRange(min, max, 0.75)); // [241, 191, 0]
 * console.log(inHexRange(min, max, 1)); // [255, 255, 0]
 */
export function inHexRange(minHex: string, maxHex: string, percent: number): number[] {
  return inRgbRange(hexToRgb(minHex), hexToRgb(maxHex), percent);
}
