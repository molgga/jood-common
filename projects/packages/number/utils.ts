/**
 * @packageDocumentation
 * @module number
 */

/**
 * 지정된 소스를 number 로 문제없이 변경이 가능한지 여부.
 * (예: null -> false, 공백 문자 -> false, true -> false '01' -> true, 1 -> true)
 * @param target 소스
 */
export function isNumber(target: any): boolean {
  if (target === null) return false;
  if (typeof target === "boolean") return false;
  if (/\d/.test(target) === false) return false;
  if (isNaN(target)) return false;
  return true;
}
