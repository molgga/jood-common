/**
 * @packageDocumentation
 * @module date
 */

import { isNumber } from "../number/utils";

/**
 * 날짜 포맷 옵션
 */
export interface DateFormatOption {
  /**
   * at 정보를 변경할 문자 포맷
   * YYYY: 년
   * MM: 월
   * DD: 일
   * AA: 오전|오후
   * hh: 시
   * mm: 분
   * ss: 초
   * (예: YYYY-MM-DD AA hh -> 2020-01-01 오전 12시)
   */
  format?: string;

  /**
   * at 의 곱셈(at 정보를 unixtime 으로 다루는 경우 1000 을 옵션으로 지정)
   */
  multiple?: number;

  /**
   * at 정보가 invalid 할 때 대체 문자
   */
  alternative?: string;
}

/**
 * 지정된 시간을 지정된 옵션의 포맷으로 변경
 * @param at 시간
 * @param options 옵션
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
    dateStr = dateStr.replace(
      /MM/,
      (dtMonth < 10 ? `0${dtMonth}` : dtMonth).toString()
    );
    dateStr = dateStr.replace(
      /DD/,
      (dtDate < 10 ? `0${dtDate}` : dtDate).toString()
    );

    if (/AA/.test(dateStr) === true) {
      dateStr = dateStr.replace(/AA/, dtAA);
      dateStr = dateStr.replace(
        /hh/,
        (dtHourA < 10 ? `0${dtHourA}` : dtHourA).toString()
      );
    } else {
      dateStr = dateStr.replace(
        /hh/,
        (dtHour < 10 ? `0${dtHour}` : dtHour).toString()
      );
    }

    dateStr = dateStr.replace(
      /mm/,
      (dtMinute < 10 ? `0${dtMinute}` : dtMinute).toString()
    );
    dateStr = dateStr.replace(
      /ss/,
      (dtSecond < 10 ? `0${dtSecond}` : dtSecond).toString()
    );
  }
  return dateStr;
}

/**
 * 지난시간 포맷 옵션
 */
export interface DatePastOption {
  /**
   * 방금 전으로 표시될 최대 시간(초)
   */
  justMax?: number;

  /**
   * '방금 전' 라벨
   */
  justLabel?: string;

  /**
   * 'n분 전' 으로 표시될 최대 시간(초)
   */
  minuteMax?: number;

  /**
   * '분 전' 라벨
   */
  minuteLabel?: string;

  /**
   * 'n시간 전' 으로 표시될 최대 시간(초)
   */
  hourMax?: number;

  /**
   * '시간 전' 라벨
   */
  hourLabel?: string;

  /**
   * 'n일 전' 으로 표시될 최대 시간(초)
   */
  dayMax?: number;

  /**
   * '일 전' 라벨
   */
  dayLabel?: string;

  /**
   * dayMax 도 넘어가는 시간인 경우 표시될 날짜 포맷
   */
  format?: string;
}

/**
 * pastAt 이 fromAt 으로 부터 지나간 시간을 지정된 옵션에 따라 반환.
 * @param fromAt 기준 시간
 * @param pastAt 비교할 시간
 * @param options 옵션
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
    format = "YYYY-MM-DD hh:mm:ss"
  }: DatePastOption = options;

  if (!pastAt || !fromAt || fromAt <= pastAt) {
    return justLabel;
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
