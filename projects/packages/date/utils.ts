/**
 * @packageDocumentation
 * @module date
 */

import { isNumber } from "../number/utils";
import { leadingTime } from "../string/utils";

/**
 * 날짜 포맷 옵션
 * @interface
 * @property format {string} at 정보를 변경할 문자 포맷 (예: YYYY-MM-DD AA hh -> 2020-01-01 오전 12시)
 * @property multiple {number} at 의 곱셈(at 정보를 unixtime 으로 다루는 경우 1000 을 옵션으로 지정)
 * @property alternative {string} at 정보가 invalid 할 때 대체 문자
 */
export interface DateFormatOption {
  format?: string;
  multiple?: number;
  alternative?: string;
}

/**
 * 지정된 시간을 지정된 옵션의 포맷으로 변경
 * @param at 시간
 * @param options 옵션
 * @example
 * const at1 = 1553146437000; // new Date("2019-03-21 14:33:57").getTime();
 * const at2 = 1553146437; // unixtime
 * console.log(toFormat(at1)); // "2019-03-21 14:33:57"
 * console.log(toFormat(at1, { format: "YYYY-MM-DD" })); // "2019-03-21"
 * console.log(toFormat(at1, { format: "hh:mm:ss YYYY/MM/DD" })); // "14:33:57 2019/03/21"
 * console.log(toFormat(at2, { multiple: 1000 })); // "2019-03-21 14:33:57"
 * console.log(toFormat("", { alternative: "Unknown" })); // "Unknown"
 */
export function toFormat(at: number, options: DateFormatOption = {}): string {
  const {
    multiple = 1,
    alternative = "",
    format = "YYYY-MM-DD hh:mm:ss"
  }: DateFormatOption = options;
  let dateStr = alternative;
  if (isNumber(at)) {
    const date = new Date(at * multiple);
    const dtYear = date.getFullYear();
    const dtMonth = date.getMonth() + 1;
    const dtDate = date.getDate();
    const dtHour = date.getHours();
    const dtHourA = dtHour < 13 ? dtHour : dtHour - 12;
    const dtMinute = date.getMinutes();
    const dtSecond = date.getSeconds();
    let dtAA = dtHour < 13 ? "오전" : "오후";

    dateStr = format;
    dateStr = dateStr.replace(/YYYY/, dtYear.toString());
    dateStr = dateStr.replace(/MM/, leadingTime(dtMonth));
    dateStr = dateStr.replace(/DD/, leadingTime(dtDate));
    if (/AA/.test(dateStr) === true) {
      dateStr = dateStr.replace(/AA/, dtAA);
      dateStr = dateStr.replace(/hh/, leadingTime(dtHourA));
    } else {
      dateStr = dateStr.replace(/hh/, leadingTime(dtHour));
    }
    dateStr = dateStr.replace(/mm/, leadingTime(dtMinute));
    dateStr = dateStr.replace(/ss/, leadingTime(dtSecond));
  }
  return dateStr;
}

/**
 * 지난시간 포맷 옵션
 * @interface
 * @property justMax? {number} 방금 전으로 표시될 최대 시간(초)
 * @property justLabel? {string} '방금 전' 라벨
 * @property minuteMax? {number} 'n분 전' 으로 표시될 최대 시간(초)
 * @property minuteLabel? {string} '분 전' 라벨
 * @property hourMax? {number} 'n시간 전' 으로 표시될 최대 시간(초)
 * @property hourLabel? {string} '시간 전' 라벨
 * @property dayMax? {number} 'n일 전' 으로 표시될 최대 시간(초)
 * @property dayLabel? {string} '일 전' 라벨
 * @property format? {string} dayMax 도 넘어가는 시간인 경우 표시될 날짜 포맷
 */
export interface DatePastOption {
  justMax?: number;
  justLabel?: string;
  minuteMax?: number;
  minuteLabel?: string;
  hourMax?: number;
  hourLabel?: string;
  dayMax?: number;
  dayLabel?: string;
  format?: string;
  alternative?: any;
}

/**
 * pastAt 이 fromAt 으로 부터 지나간 시간을 지정된 옵션에 따라 반환.
 * @param fromAt 기준 시간
 * @param pastAt 비교할 시간
 * @param options 옵션
 * @example
 * const now = new Date("2019-03-12 08:10:20").getTime();
 * console.log(toPast(now, new Date("2019-03-12 08:09:21").getTime())); // '방금 전'
 * console.log(toPast(now, new Date("2019-03-12 08:00:20").getTime())); // '10분 전'
 * console.log(toPast(now, new Date("2019-03-12 07:10:20").getTime())); // '1시간 전'
 * console.log(toPast(now, new Date("2019-03-11 08:10:21").getTime())); // '23시간 전'
 * console.log(toPast(now, new Date("2019-03-10 08:10:20").getTime())); // '2일 전'
 * console.log(toPast(now, new Date("2019-02-10 08:10:19").getTime(), { format: "YYYY년 MM월 DD일"})); // "2019년 02월 10일"
 */
export function toPast(
  fromAt: number,
  pastAt: number,
  options: DatePastOption = {}
): string {
  const {
    justMax = 60,
    minuteMax = 3600,
    hourMax = 86400,
    dayMax = 2592000,
    justLabel = "방금 전",
    minuteLabel = "분 전",
    hourLabel = "시간 전",
    dayLabel = "일 전",
    format = "YYYY-MM-DD hh:mm:ss",
    alternative = "Unknown"
  }: DatePastOption = options;

  if (!pastAt || !fromAt || fromAt <= pastAt) {
    return alternative;
  }

  const pastSecond = Math.floor((fromAt - pastAt) / 1000);
  const pastMinute = Math.floor(pastSecond / 60);
  const pastHour = Math.floor(pastMinute / 60);
  const pastDay = Math.floor(pastHour / 24);

  if (pastSecond < justMax) return justLabel;
  if (pastSecond < minuteMax) return `${pastMinute}${minuteLabel}`;
  if (pastSecond < hourMax) return `${pastHour}${hourLabel}`;
  if (pastSecond <= dayMax) return `${pastDay}${dayLabel}`;
  return toFormat(pastAt, { format });
}
