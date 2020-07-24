/**
 * @packageDocumentation
 * @module string
 */
import { isNumber } from "../number/utils";

/**
 * 일치하는 모든 문자를 변경
 * @param text 소스 문자열
 * @param find 검색 문자열
 * @param replace 치환 문자열
 * @example
 * console.log(replaceAll("a-b-c", "-", "@")); // "a@b@c"
 */
export function replaceAll(
  text: string,
  find: string,
  replace: string = ""
): string {
  if (!text) return text;
  if (!find) return text;
  return text.split(find).join(replace);
}

/**
 * 태그 문자열에서 태그를 모두 제거
 * @param tagText 소스 문자열
 * @param removeTabSpace 탭 문자를 제거할지 여부
 * @example
 * console.log(removeTag(`<div><h1>Complete beginners</h1> <h2>first steps</h2></div>`)); // "Complete beginners first steps"
 */
export function removeTag(
  tagText: string,
  removeTabSpace: boolean = true
): string {
  let refine = tagText.replace(/(<([^>]+)>)/gi, "");
  if (removeTabSpace) refine = replaceAll(refine, "\t", "");
  return refine;
}

/**
 * 소스 문자열의 맨 앞 문자를 대문자로 변경
 * @param text 소스 문자열
 * @example
 * console.log(toUpperCaseHead("abc")); // "Abc"
 */
export function toUpperCaseHead(text: string): string {
  const head = text.substring(0, 1).toUpperCase();
  const tail = text.substring(1, text.length);
  return `${head}${tail}`;
}

/**
 * 소스 문자열의 언더바(_)를 카멜 케이스로 변경
 * @param text 소스 문자열
 * @example
 * console.log(toCamelFromSnake("user_name")); // "userName"
 */
export function toCamelFromSnake(text: string): string {
  return text.replace(/([_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("_", "");
  });
}

/**
 * 소스 문자열의 하이픈(-)을 카멜 케이스로 변경
 * @param text 소스 문자열
 * @example
 * console.log(toCamelFromKebab("user-name")); // "userName"
 */
export function toCamelFromKebab(text: string): string {
  return text.replace(/([-][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "");
  });
}

/**
 * 소스 문자열을 단어 단위로 분리
 * @param text 소스 문자열
 * @example
 * console.log(toWordArray("hello foo bar")); // ["hello", "foo", "bar"]
 */
export function toWordArray(text: string): string[] {
  const refine = [];
  const strReg = /\s*\S*/g;
  let word = strReg.exec(text)[0].trim();
  while (word) {
    refine.push(word);
    word = strReg.exec(text)[0].trim();
    if (word === "") break;
  }
  return refine;
}

/**
 * 지정된 인덱스에 문자를 삽입
 * @param text 소스 문자열
 * @param index 삽입될 인덱스
 * @param addText 삽입될 문자열
 * @example
 * console.log(insert("abcde", 1, "@")); // "a@bcde"
 */
export function insert(text: string, index: number, addText: string): string {
  let head = null;
  let tail = null;
  let refine;
  if (isNumber(index)) {
    const textLen = text.length;
    const safeIndex = index < 0 ? 0 : Math.min(index, textLen);
    head = text.substring(0, safeIndex);
    tail = text.substring(safeIndex, textLen);
    refine = `${head}${addText}${tail}`;
  } else {
    refine = text;
  }
  return refine;
}

/**
 * 문자열 좌측을 지정된 길이로 채웁니다.
 * 문자열의 길이가 지정된 길이 보다 길다면 좌측 부터 잘라냅니다.
 * @param text 소스 문자열
 * @param addText 추가될 문자열
 * @param expectCount 최종 문자열 수
 * @example
  console.log(padStart("123", "0", 5)); // "00123"
  console.log(padStart("hello", "0", 1)); // "h"
  console.log(padStart("hello", "0", 2)); // "he"
  console.log(padStart("hello", "0", 3)); // "hel"
  console.log(padStart("hello", "0", 4)); // "hell"
  console.log(padStart("hello", "0", 5)); // "hello"
  console.log(padStart("hello", "0", 6)); // "0hello"
 */
export function padStart(
  text: string | number,
  addText: string,
  expectCount?: number
): string | number {
  let refine;
  if (!expectCount) {
    return text;
  }
  if (typeof text === "string" || typeof text === "number") {
    refine = text.toString();
    const len = refine.length;
    if (len < expectCount) {
      const count = expectCount - len;
      const adds = Array.from(Array(count)).map(() => addText);
      refine = `${adds.join("")}${text}`;
      if (expectCount < refine.length) {
        refine = refine.substring(refine.length - expectCount, refine.length);
      }
    } else {
      refine = refine.substring(0, expectCount);
    }
  } else {
    refine = text;
  }
  return refine;
}

/**
 * 문자열 우측을 지정된 길이로 채웁니다.
 * 문자열의 길이가 지정된 길이 보다 길다면 우측 부터 잘라냅니다.
 * @param text 소스 문자열
 * @param addText 추가될 문자열
 * @param expectCount 합쳐진 문자열 수
 * @example
  console.log(padEnd("123", "0", 5)); // "12300"
  console.log(padEnd("hello", "0", 1)); // "o"
  console.log(padEnd("hello", "0", 2)); // "lo"
  console.log(padEnd("hello", "0", 3)); // "llo"
  console.log(padEnd("hello", "0", 4)); // "ello"
  console.log(padEnd("hello", "0", 5)); // "hello"
  console.log(padEnd("hello", "0", 6)); // "hello0"
 */
export function padEnd(
  text: string | number,
  addText: string,
  expectCount?: number
): string | number {
  let refine;
  if (!expectCount) {
    return text;
  }
  if (typeof text === "string" || typeof text === "number") {
    refine = text.toString();
    const len = refine.length;
    if (len < expectCount) {
      const count = expectCount - len;
      const adds = Array.from(Array(count)).map(() => addText);
      refine = `${text}${adds.join("")}`;
      if (expectCount < refine.length) {
        refine = refine.substring(0, expectCount);
      }
    } else {
      refine = refine.substring(len - expectCount, len);
    }
  } else {
    refine = text;
  }
  return refine;
}

/**
 * 지정된 시간 숫자 앞에 0을 채워야 하는 경우 0을 채움.
 * (예: 2 -> 02, 9 -> 09, 10 -> 10)
 * @param time 시간 표시용 숫자 | 문자
 * @example
 * console.log(leadingTime(5)); // "05"
 */
export function leadingTime(time: string | number): string {
  let refine;
  if (isNumber(time)) {
    const safeNum = Number(time);
    refine = 0 <= safeNum && safeNum < 10 ? `0${safeNum}` : time.toString();
  } else {
    refine = time;
  }
  return refine;
}

/**
 * 가격 포맷 옵션
 * @interface CurrencyPriceOption
 * @property fixed? {number} 소숫점 까지 표시되어야 하는 경우 지정된 숫자만큼 표시. (예: fixed = 1 -> 99.0, fixed = 2 -> 99.00)
 * @property replaceChar? {string} 가격 표시 중간에 들어가 대치 문자
 */
export interface CurrencyPriceOption {
  fixed?: number;
  replaceChar?: string;
}

/**
 * 지정된 숫자(문자)를 가격 표시용 문자로 변경
 * (예: 1000 -> 1,000)
 * @param price 가격 문자 | 숫자
 * @param options 옵션
 * @example
 * console.log(toCurrencyFormat(1234)); // "1,234"
 * console.log(toCurrencyFormat(1234.9, { fixed: 2 })); // "1,234.90"
 */
export function toCurrencyFormat(
  price: string | number,
  options: CurrencyPriceOption = {}
): string | any {
  if (!isNumber(price)) {
    return price;
  }
  const { fixed = 0, replaceChar = "," } = options;
  const safeStr = String(price);
  let refine = "";
  let splits = safeStr.split(".");
  let decimal = "";
  let normal = splits[0];
  normal = Number(normal)
    .toFixed(1)
    .replace(/\d(?=(\d{3})+\.)/g, `$&${replaceChar}`);
  normal = normal.substring(0, normal.length - 2);

  const hasPoint = /\./.test(safeStr);
  if (hasPoint) {
    decimal = splits[1];
  }

  if (0 < fixed) {
    const decimalLen = decimal.length;
    if (decimalLen < fixed) {
      const pad = Array.from(Array(fixed - decimalLen))
        .map(() => "0")
        .join("");
      decimal = `${decimal}${pad}`;
    } else {
      decimal = decimal.substring(0, fixed);
    }
    refine = `${normal}.${decimal}`;
  } else {
    refine = hasPoint ? `${normal}.${decimal}` : normal;
  }
  return refine;
}

/**
 * 지정된 소스 문자열이 기준 수를 넘어가면 좌, 우로 잘라내고 사이에 대체 문자를 삽입.
 * @param text 소스 문자열
 * @param max 잘라낼 기준 수
 * @param alternative 잘라낸 문자열 사이에 들어갈 문자열
 * @example
 console.log(toEllipsisMiddle("https://developers.google.com/web/fundamentals/architecture/app-shell", 30)); // "https://develop...cture/app-shell"
 console.log(toEllipsisMiddle("01234567890", 6)); // "012...789"
 console.log(toEllipsisMiddle("01234567890", 10)); // "0123456789"
 console.log(toEllipsisMiddle("01234567890", 11)); // "0123456789"
 */
export function toEllipsisMiddle(
  text: string,
  max: number = 50,
  alternative: string = "..."
): string {
  if (!text) return text;
  let refine = text.toString();
  const strLen = refine.length;
  if (max < strLen) {
    const half = Math.floor(max / 2);
    let strStart = refine.substring(0, half);
    let strEnd = refine.substring(strLen - half, strLen);
    refine = `${strStart}${alternative}${strEnd}`;
  }
  return refine;
}

/**
 * 지정된 소스 문자열이 기준 수를 넘어가면 마지막을 잘라내고 문자를 삽입.
 * (예: abcdefghijklmn -> abcd...)
 * @param text 소스 문자열
 * @param max 잘라낼 기준 수
 * @param alternative 잘라낸 문자열 마지막에 들어갈 문자열
 * @example
 console.log(toEllipsisEnd("https://developers.google.com/web/fundamentals/architecture/app-shell", 10)); // "https://de..."
 console.log(toEllipsisEnd("01234567890", 5)); // "01234..."
 console.log(toEllipsisEnd("01234567890", 10)); // "01234567890"
 console.log(toEllipsisEnd("01234567890", 11)); // "01234567890"
 */
export function toEllipsisEnd(
  text: string,
  max: number = 50,
  alternative: string = "..."
): string {
  if (!text) return text;
  let refine = text.toString();
  const strLen = refine.length;
  if (max < strLen) {
    refine = `${refine.substring(0, max)}${alternative}`;
  }
  return refine;
}

/**
 * @ignore
 */
let _domParser: DOMParser = null;

/**
 * 엔티티 코드로 변형된 html 을 태그 문자열로 변경
 * (예: &lt;&nbsp;1&amp;2&nbsp;&gt; -> < 1&2 >)
 * @param source 소스 문자열
 * @example
 * console.log(refineSafeHtmlText("&lt;div&gt;1&lt;/div&gt;")); // "<div>1</div>"
 */
export function refineSafeHtmlText(source: string): string {
  let refine = "";
  try {
    if (!_domParser) _domParser = new DOMParser();
    const dom = _domParser.parseFromString(source, "text/html");
    refine = dom.body.textContent;
  } catch (err) {
    refine = source;
  }
  return refine;
}

/**
 * html 문자열의 엔티티 처리
 * @param text 소스(html) 문자열
 * @example
 * console.log(escape("<div>ab&cd</div>")); // "&lt;div&gt;ab&amp;cd&lt;/div&gt;"
 */
export function escape(text: string): string {
  return text.replace(/[<>&]/g, function (match) {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      default:
        return match;
    }
  });
}

/**
 * 시작 공백 제거
 * @param {string} text 소스 문자열
 * @example
 * console.log(trimStart("&#10240; \u2800 a b ")); // "a b "
 */
export function trimStart(text: string): string {
  return text.replace(/^(\u2800|&#10240;|\s)+/g, "");
}

/**
 * 끝 공백 제거
 * @param {string} text 소스 문자열
 * @example
 * console.log(trimEnd(" a b &#10240; \u2800")); // " a b"
 */
export function trimEnd(text: string): string {
  return text.replace(/(\u2800|&#10240;|\s)+$/g, "");
}

/**
 * u+2800, &#10240 을 일반 문자 공백으로 치환
 * @param {string} text 소스 문자열
 * @example
 * console.log(refineWhitespace("&#10240;\u2800")); // "  "
 */
export function refineWhitespace(text: string): string {
  return text.replace(/(\u2800|&#10240;)/g, " ");
}

/**
 * allow 이상 연속되는 줄바꿈을 제거
 * @param text
 * @param [allow=2]
 * @example
 * console.log(collapseMutiline("hello\n\n\n\nfoo", 2)); // "hello\n\nfoo"
 * console.log(collapseMutiline("hello\n\n\n\nfoo", 3)); // "hello\n\n\nfoo"
 */
export function collapseMultiline(text: string, allow: number = 2): string {
  const separate = text.split(/\n/);
  const refine: string[] = [];
  const testReg: RegExp = /[^\s]/;
  let cnt: number = 0;
  separate.forEach((str: string) => {
    const isBreak = !testReg.test(str);
    if (isBreak) {
      cnt++;
      if (cnt < allow) {
        refine.push(str);
      }
    } else {
      refine.push(str);
      cnt = 0;
    }
  });
  return refine.join("\n");
}

/**
 * 마스킹 처리 옵션
 * @interface MaskingOptions
 * @property mask? {string} 마스킹 문자
 * @property maxShow? {number} 마스킹 되지 않는 최대 문자수
 */
interface MaskingOptions {
  mask?: string;
  maxShow?: number;
}

/**
 * 문자열 마스킹 - 앞 기준
 * @param {string} text 소수 문자열
 * @param {MaskingOptions} [options={}] 마스킹 옵션
 */
export function toMaskingFirst(
  text: string,
  options: MaskingOptions = {}
): string {
  const strLength = text.length;
  if (!strLength || strLength <= 1) return text;
  const { mask = "*", maxShow = 0 } = options;
  const strHalf = Math.floor(strLength / 2);
  const cutPivot = maxShow ? Math.min(maxShow, strHalf) : strHalf;
  const cutFirst = strLength - Math.max(1, cutPivot);
  const strFirst = Array.from(Array(cutFirst))
    .map(() => mask)
    .join("");
  const strLast = text.slice(cutFirst);
  return strFirst + strLast;
}

/**
 * 문자열 마스킹 - 뒤 기준
 * @param {string} text 소수 문자열
 * @param {MaskingOptions} [options={}] 마스킹 옵션
 */
export function toMaskingLast(text: string, options: MaskingOptions = {}) {
  const strLength = text.length;
  if (!strLength || strLength <= 1) return text;
  const { mask = "*", maxShow = 0 } = options;
  const strHalf = Math.floor(strLength / 2);
  const cutPivot = maxShow ? Math.min(maxShow, strHalf) : strHalf;
  const cutFirst = Math.max(1, cutPivot);
  const strFirst = text.slice(0, cutFirst);
  const strLast = Array.from(Array(strLength - cutFirst))
    .map(() => mask)
    .join("");
  return strFirst + strLast;
}

/**
 * 문자열 마스킹 - 중간 기준
 * @param {string} text 소수 문자열
 * @param {MaskingOptions} [options={}] 마스킹 옵션
 */
export function toMaskingMiddle(text: string, options: MaskingOptions = {}) {
  const strLength = text.length;
  if (!strLength || strLength <= 1) return text;
  const { mask = "*", maxShow = 0 } = options;
  const strHalf = Math.floor(strLength / 2);
  const cutPivot = maxShow ? Math.min(maxShow, strHalf) : strHalf;
  const cutFirst = Math.max(1, Math.ceil(cutPivot / 2));
  const cutLast = Math.max(0, cutPivot - cutFirst);
  const strFirst = text.slice(0, cutFirst);
  const strMiddle = Array.from(Array(strLength - cutFirst - cutLast))
    .map(() => mask)
    .join("");
  const strLast = cutLast ? text.slice(-cutLast) : "";
  return strFirst + strMiddle + strLast;
}

/**
 * 문자열 마스킹 - 양쪽 기준
 * @param {string} text 소수 문자열
 * @param {MaskingOptions} [options={}] 마스킹 옵션
 */
export function toMaskingJustify(text: string, options: MaskingOptions = {}) {
  const strLength = text.length;
  if (!strLength || strLength <= 1) return text;
  const { mask = "*", maxShow = 0 } = options;
  const strHalf = Math.floor(strLength / 2);
  const cutPivot = maxShow ? Math.min(maxShow, strHalf) : strHalf;
  const cutFirst = Math.max(1, Math.ceil((strLength - cutPivot) / 2));
  const cutLast = Math.max(0, strLength - cutFirst - cutPivot);
  const strFirst = text.slice(0, cutFirst).replace(/./g, mask);
  const strMiddle = cutLast
    ? text.slice(cutFirst, -cutLast)
    : text.slice(cutFirst);
  const strLast = cutLast ? text.slice(-cutLast).replace(/./g, mask) : "";
  return strFirst + strMiddle + strLast;
}
