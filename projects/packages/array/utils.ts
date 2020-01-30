/**
 * @packageDocumentation
 * @module array
 */

/**
 * 지정된 avaliable 에 value 가 포함되는 경우 value 를, 그렇지 않은 경우 or 값을 반환
 * @param available 유효한 값들
 * @param value 검사할 값
 * @param or 검사할 값이 유효한 값에 포함되지 않을 경우 대체 값
 */
export function availableOr(available: any[] = [], value: any, or = null): any {
  if (!available.length) return or;
  const find = available.find((compare: any) => {
    return compare === value;
  });
  return find || or;
}

/**
 * 지정된 ref 배열에 index 에 value 를 삽입.
 * @param ref 값이 삽입될 소스 배열
 * @param index 삽입될 인덱스
 * @param value 삽입될 값
 */
export function insert(ref: any[], index: number = -1, value: any): any[] {
  if (isNaN(index) || index < 0 || ref.length <= index) {
    if (value instanceof Array) {
      ref.push(...value);
    } else {
      ref.push(value);
    }
  } else {
    if (value instanceof Array) {
      ref.splice(index, 0, ...value);
    } else {
      ref.splice(index, 0, value);
    }
  }
  return ref;
}
