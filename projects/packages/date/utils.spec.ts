import { toFormat, toPast } from "./utils";

describe("date utils", () => {
  it("toPast", () => {
    const now = new Date("2019-03-12 08:10:20").getTime();

    expect(toPast(now, new Date("2019-03-12 08:09:21").getTime())).toBe(
      "방금 전"
    );
    expect(toPast(now, new Date("2019-03-12 08:09:23").getTime())).toBe(
      "방금 전"
    );
    expect(toPast(now, new Date("2019-03-12 08:09:20").getTime())).toBe(
      "1분 전"
    );
    expect(toPast(now, new Date("2019-03-12 08:08:21").getTime())).toBe(
      "1분 전"
    );
    expect(toPast(now, new Date("2019-03-12 08:08:20").getTime())).toBe(
      "2분 전"
    );
    expect(toPast(now, new Date("2019-03-12 08:01:20").getTime())).toBe(
      "9분 전"
    );
    expect(toPast(now, new Date("2019-03-12 08:00:20").getTime())).toBe(
      "10분 전"
    );
    expect(toPast(now, new Date("2019-03-12 07:10:21").getTime())).toBe(
      "59분 전"
    );
    expect(toPast(now, new Date("2019-03-12 07:10:20").getTime())).toBe(
      "1시간 전"
    );
    expect(toPast(now, new Date("2019-03-12 07:10:19").getTime())).toBe(
      "1시간 전"
    );
    expect(toPast(now, new Date("2019-03-12 06:10:21").getTime())).toBe(
      "1시간 전"
    );
    expect(toPast(now, new Date("2019-03-12 06:10:20").getTime())).toBe(
      "2시간 전"
    );
    expect(toPast(now, new Date("2019-03-12 06:10:19").getTime())).toBe(
      "2시간 전"
    );

    expect(toPast(now, new Date("2019-03-11 08:10:21").getTime())).toBe(
      "23시간 전"
    );
    expect(toPast(now, new Date("2019-03-11 08:10:20").getTime())).toBe(
      "1일 전"
    );
    expect(toPast(now, new Date("2019-03-11 08:10:19").getTime())).toBe(
      "1일 전"
    );

    expect(toPast(now, new Date("2019-03-10 08:10:21").getTime())).toBe(
      "1일 전"
    );
    expect(toPast(now, new Date("2019-03-10 08:10:20").getTime())).toBe(
      "2일 전"
    );
    expect(toPast(now, new Date("2019-03-10 08:10:19").getTime())).toBe(
      "2일 전"
    );

    expect(toPast(now, new Date("2019-02-10 08:10:21").getTime())).toBe(
      "29일 전"
    );
    expect(toPast(now, new Date("2019-02-10 08:10:20").getTime())).toBe(
      "30일 전"
    );
    expect(toPast(now, new Date("2019-02-10 08:10:19").getTime())).toBe(
      "2019-02-10 08:10:19"
    );
    expect(
      toPast(now, new Date("2019-02-10 08:10:19").getTime(), {
        format: "YYYY년 MM월 DD일"
      })
    ).toBe("2019년 02월 10일");
  });

  it("toFormat", () => {
    const test1 = new Date("2019-03-21 14:33:57");
    const test2 = new Date("2019-03-21 00:33:57");
    expect(toFormat(test1.getTime())).toBe("2019-03-21 14:33:57");
    expect(toFormat(test1.getTime(), { format: "YYYY-MM-DD" })).toBe(
      "2019-03-21"
    );
    expect(toFormat(test1.getTime(), { format: "hh:mm:ss" })).toBe("14:33:57");
    expect(toFormat(test1.getTime(), { format: "hh:mm:ss YYYY/MM/DD" })).toBe(
      "14:33:57 2019/03/21"
    );
    expect(toFormat(test1.getTime(), { format: "YYYY-MM-DD AA hh:mm" })).toBe(
      "2019-03-21 오후 02:33"
    );
    expect(toFormat(test2.getTime(), { format: "YYYY-MM-DD AA hh:mm" })).toBe(
      "2019-03-21 오전 00:33"
    );
    expect(
      toFormat(Math.ceil(test1.getTime() / 1000), {
        multiple: 1000,
        format: "hh:mm:ss YYYY/MM/DD"
      })
    ).toBe("14:33:57 2019/03/21");
    expect(
      toFormat(null, {
        alternative: "Unknown"
      })
    ).toBe("Unknown");
    expect(
      toFormat(undefined, {
        alternative: "Unknown"
      })
    ).toBe("Unknown");
    expect(toFormat(0)).toBe("1970-01-01 09:00:00");
  });
});
