/**
 * @packageDocumentation
 * @module array
 */
import { getRandomizer } from "../number/utils";

/**
 * 지정된 avaliable 에 value 가 포함되는 경우 value 를, 그렇지 않은 경우 or 값을 반환
 * @template T
 * @param [available=[]] 유효한 값들
 * @param value 검사할 값
 * @param [or=null] 검사할 값이 유효한 값에 포함되지 않을 경우 대체 값
 * @example
 * console.log(availableOr(available1, 10, 10)); // 10
 * console.log(availableOr(available1, 20, 10)); // 20
 * console.log(availableOr(available1, 30, 10)); // 30
 * console.log(availableOr(available1, 30, null)); // 30
 * console.log(availableOr(available1, 111, 10)); // 10
 * console.log(availableOr(available1, 222, 10)); // 10
 * console.log(availableOr(available1, 333, 10)); // 10
 * console.log(availableOr(available1, 444, null)); // null
 */
export function availableOr<T>(
  available: ArrayLike<T> = [],
  value: any,
  or = null
): T {
  if (!available.length) return or;
  const find = (available as any[]).find((compare: any) => {
    return compare === value;
  });
  return find || or;
}

/**
 * 지정된 ref 배열의 index 에 value 를 삽입합니다.
 * (원본 ref 가 직접 변경 됩니다.)
 * @param ref 소스 배열
 * @param [index=0] 삽입될 인덱스
 * @param value 삽입될 값
 * @example
 * console.log(insert([1, 2, 3], 1, 99)); // [1, 99, 2, 3]
 * console.log(insert([1, 2, 3], 1, ["A", "B"])); // [1, "A", "B", 2, 3];
 * console.log(insert([1, 2, 3], 10, 99)); // [1, 2, 3, 99]);
 * console.log(insert([1, 2, 3], 10, ["A", "B"])); // [1, 2, 3, "A", "B"];
 * console.log(insert([1, 2, 3], null, "A")); // ["A", 1, 2, 3];
 */
export function insert(ref: any[], index: number = 0, value: any): any[] {
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

/**
 * 지정된 ref 배열의 index ~ deleteCount 만큼 제거합니다.
 * (원본 ref 가 직접 변경 됩니다.)
 * @template T
 * @param ref 소스 배열
 * @param [index=0] 삭제 시작 index
 * @param [deleteCount=1] 삭제 갯수
 * @example
 * console.log(extract([1, 2, 3, 4])); // [2, 3, 4];
 * console.log(extract([1, 2, 3, 4], 1, 1)); // [1, 3, 4];
 * console.log(extract([1, 2, 3, 4], 2, 1)); // [1, 2, 4];
 * console.log(extract([1, 2, 3, 4], 3, 1)); // [1, 2, 3];
 * console.log(extract([1, 2, 3, 4], 0, 2)); // [3, 4];
 * console.log(extract([1, 2, 3, 4], 0, 10)); // [];
 * console.log(extract([1, 2, 3, 4], 2, 10)); // [1, 2];
 */
export function extract<T>(
  ref: ArrayLike<T>,
  index: number = 0,
  deleteCount: number = 1
): ArrayLike<T> {
  if (isNaN(index) || index < 0 || ref.length <= index) {
    return ref;
  }
  (ref as any[]).splice(index, deleteCount);
  return ref;
}

/**
 * 지정된 마지막 배열을 아이템을 반환 합니다.
 * @template T
 * @param array 소스 배열
 * @param [shiftIndex=0] 아이템을 꺼낼 index. (뒤에서 앞으로)
 * @param [overflowSafe=true] 계산된 index 가 0 보다 작은 경우는 맨 앞, length 보다 큰 경우는 마지막 아이템 index 로 찾을지 여부
 * @example
 * console.log(tail([1, 2, 3, 4])); // 4
 * console.log(tail([1, 2, 3, 4],1)); // 3
 * console.log(tail([1, 2, 3, 4],2)); // 2
 * console.log(tail([1, 2, 3, 4],3)); // 1
 * console.log(tail([1, 2, 3, 4],4)); // 1
 * console.log(tail([1, 2, 3, 4],-1)); // 4
 */
export function tail<T>(
  array: ArrayLike<T>,
  shiftIndex: number = 0,
  overflowSafe: boolean = true
): T {
  const lastIndex = array.length - 1;
  let index = lastIndex - shiftIndex;
  if (overflowSafe) {
    if (index < 0) {
      index = 0;
    } else if (lastIndex < index) {
      index = lastIndex;
    }
  }
  return array[index];
}

/**
 * 중복된 값을 제외시킨 배열을 반환 합니다.
 * @template T
 * @param array 소스 배열
 * @param [uniqueFn] 직접 filter 할 key 값을 반환할 수 있는 함수
 * @example
 *
 * const arr1 = [1, 2, 3, 4, 5];
 * const arr2 = [1, 2, 1, 3, 4, 4, 3, 5, 1];
 * const arr3 = [
 *   { id: 1, name: "google" },
 *   { id: 2, name: "microsoft" },
 *   { id: 1, name: "google" },
 *   { id: 3, name: "amazone" }
 * ];
 * console.log(distinct(arr1)); // [1, 2, 3, 4, 5]
 * console.log(distinct(arr2)); // [1, 2, 3, 4, 5]
 * console.log(distinct(arr3, item => {
 *   return item.id;
 * })); // [{ id: 1, name: "google" }, { id: 2, name: "microsoft" }, { id: 3, name: "amazone" }]
 */
export function distinct<T>(
  array: ReadonlyArray<T>,
  uniqueFn?: (item: T) => string | any
): T[] {
  if (!uniqueFn) {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  }
  return array.filter(uniqueFilter(uniqueFn));
}

/**
 * unique 필터를 만들 때 흔히 반복되는 구문을 구현해 놓은 함수
 * @template T
 * @param uniqueFn filter 할 key 값을 반환할 수 있는 함수
 * @example
 * const arr1 = [
 *   { id: 1, name: "google" },
 *   { id: 2, name: "microsoft" },
 *   { id: 1, name: "google" },
 *   { id: 3, name: "amazone" }
 * ];
 * const idFilter = item => {
 *   return item.id;
 * };
 * const nameFilter = item => {
 *   return item.name;
 * };
 * console.log(arr1.filter(uniqueFilter(idFilter))); // [{ id: 1, name: "google" },{ id: 2, name: "microsoft" },{ id: 3, name: "amazone" } ]
 * console.log(arr1.filter(uniqueFilter(nameFilter))); // [{ id: 1, name: "google" },{ id: 2, name: "microsoft" },{ id: 3, name: "amazone" } ]
 */
export function uniqueFilter<T>(
  uniqueFn: (item: T) => string | any
): (item: T) => boolean {
  const hash: { [key: string]: boolean } = {};
  return item => {
    const key = uniqueFn(item);
    if (hash[key]) return false;
    hash[key] = true;
    return true;
  };
}

/**
 * 배열을 섞습니다.
 * @template T
 * @param ref 소스 배열
 * @param [seed] [getRandomizer]{@link getRandomizer}
 * @example
 * const arr = [1,2,3,4];
 * shuffle(arr);
 * console.log(arr); // [?,?,?,?]
 */
export function shuffle<T>(ref: T[], seed?: number): void {
  const random = getRandomizer(seed);
  for (let i = ref.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const temp = ref[i];
    ref[i] = ref[j];
    ref[j] = temp;
  }
}
