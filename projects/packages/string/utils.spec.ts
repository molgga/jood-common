import {
  replaceAll,
  toUpperCaseHead,
  toCamelFromSnake,
  toCamelFromKebab,
  toWordArray,
  insert,
  leadingTime,
  toCurrencyFormat,
  removeTag,
  padStart,
  padEnd,
  CurrencyPriceOption,
  toEllipsisMiddle,
  toEllipsisEnd,
  refineSafeHtmlText,
  escape,
  refineWhitespace,
  trimStart,
  trimEnd,
  collapseMultiline,
  toMaskingMiddle,
  toMaskingFirst,
  toMaskingLast,
  toMaskingJustify,
} from "./utils";

describe("string utils", () => {
  beforeEach(() => {});

  it("refineWhitespace", () => {
    expect(refineWhitespace("\u2800")).toBe(" ");
    expect(refineWhitespace("&#10240;")).toBe(" ");
    expect(refineWhitespace("&#10240;\u2800")).toBe("  ");
    expect(refineWhitespace("&#10240;\u2800&#10240;\u2800")).toBe("    ");
  });

  it("trimStart", () => {
    expect(trimStart(" a")).toBe("a");
    expect(trimStart("   a ")).toBe("a ");
    expect(trimStart(" a b ")).toBe("a b ");
    expect(trimStart("\u2800 a b ")).toBe("a b ");
    expect(trimStart(" \u2800 a b")).toBe("a b");
    expect(trimStart("&#10240; \u2800 a b")).toBe("a b");
  });

  it("trimEnd", () => {
    expect(trimEnd("a ")).toBe("a");
    expect(trimEnd("   a ")).toBe("   a");
    expect(trimEnd(" a b ")).toBe(" a b");
    expect(trimEnd("a b \u2800")).toBe("a b");
    expect(trimEnd("  a b \u2800 ")).toBe("  a b");
    expect(trimEnd("a b &#10240; \u2800")).toBe("a b");
  });

  it("escape", () => {
    const test1 = `<div>abcd</div>`;
    const test2 = `<div>ab&cd</div>`;
    expect(escape(test1)).toEqual("&lt;div&gt;abcd&lt;/div&gt;");
    expect(escape(test2)).toEqual("&lt;div&gt;ab&amp;cd&lt;/div&gt;");
  });

  it("refineHtmlText", () => {
    const test1 = `&lt;div&gt;1&lt;/div&gt;`;
    const test2 = `&lt;div&gt;1&lt;span&gt;2&lt;/span&gt;&lt;/div&gt;`;
    const test3 = `&lt;div attr1="1"&gt;1&nbsp;&amp;&nbsp;2&lt;/div&gt;`;
    const test4 = `<div>1&amp;2</div>`;
    expect(refineSafeHtmlText(test1)).toEqual("<div>1</div>");
    expect(refineSafeHtmlText(test2)).toEqual("<div>1<span>2</span></div>");
    expect(refineSafeHtmlText(test3)).toEqual('<div attr1="1">1 & 2</div>');
    expect(refineSafeHtmlText(test4)).toEqual("1&2");
  });

  it("toEllipsisEnd", () => {
    const test1 =
      "https://developers.google.com/web/fundamentals/architecture/app-shell";
    const test2 = "0123456789012345678901234567890123456789";
    const test3 = "0123456789";
    expect(toEllipsisEnd(test1, 10)).toBe("https://de...");
    expect(toEllipsisEnd(test2, 20)).toBe("01234567890123456789...");
    expect(toEllipsisEnd(test3, 9)).toBe("012345678...");
    expect(toEllipsisEnd(test3, 5)).toBe("01234...");
    expect(toEllipsisEnd(test3, 10)).toBe("0123456789");
    expect(toEllipsisEnd(test3, 11)).toBe("0123456789");
    expect(toEllipsisEnd(null, 11)).toBe(null);
    expect(toEllipsisEnd(undefined, 11)).toBe(undefined);

    const def = toEllipsisEnd(test1);
    expect(def).toBe("https://developers.google.com/web/fundamentals/arc...");
    expect(def.length).toBe(53); // 기본값 50 + ...(alternative 3)
  });

  it("toEllipsisMiddle", () => {
    const test1 =
      "https://developers.google.com/web/fundamentals/architecture/app-shell";
    const test2 = "0123456789012345678901234567890123456789";
    const test3 = "0123456789";
    expect(toEllipsisMiddle(test1, 30)).toBe(
      "https://develop...cture/app-shell"
    );
    expect(toEllipsisMiddle(test2, 20)).toBe("0123456789...0123456789");
    expect(toEllipsisMiddle(test3, 9)).toBe("0123...6789");
    expect(toEllipsisMiddle(test3, 8)).toBe("0123...6789");
    expect(toEllipsisMiddle(test3, 7)).toBe("012...789");
    expect(toEllipsisMiddle(test3, 6)).toBe("012...789");
    expect(toEllipsisMiddle(test3, 10)).toBe("0123456789");
    expect(toEllipsisMiddle(test3, 11)).toBe("0123456789");
    expect(toEllipsisMiddle(null, 11)).toBe(null);
    expect(toEllipsisMiddle(undefined, 11)).toBe(undefined);

    const def = toEllipsisMiddle(test1);
    expect(def).toBe("https://developers.google...ls/architecture/app-shell");
    expect(def.length).toBe(53); // 기본값 50 + ...(alternative 3)
  });

  it("padStart", () => {
    expect(padStart(1, "0", 2)).toBe("01");
    expect(padStart("1", "0", 2)).toBe("01");
    expect(padStart("123", "0", 5)).toBe("00123");
    expect(padStart("foo", "#", 3)).toBe("foo");
    expect(padStart("foo", "#", 4)).toBe("#foo");
    expect(padStart("hello", "0", 1)).toBe("h");
    expect(padStart("hello", "0", 2)).toBe("he");
    expect(padStart("hello", "0", 3)).toBe("hel");
    expect(padStart("hello", "0", 4)).toBe("hell");
    expect(padStart("hello", "0", 5)).toBe("hello");
    expect(padStart("hello", "0", 6)).toBe("0hello");
    expect(padStart("hello", "@@", 5)).toBe("hello");
    expect(padStart("hello", "@@", 6)).toBe("@hello");
    expect(padStart("hello", "0", undefined)).toBe("hello");
    expect(padStart("", "0", 1)).toBe("0");
    expect(padStart(undefined, "@@", 6)).toBe(undefined);
    expect(padStart(null, "@@", 6)).toBe(null);
  });

  it("padEnd", () => {
    expect(padEnd(1, "0", 2)).toBe("10");
    expect(padEnd("1", "0", 2)).toBe("10");
    expect(padEnd("123", "0", 5)).toBe("12300");
    expect(padEnd("foo", "#", 3)).toBe("foo");
    expect(padEnd("foo", "#", 4)).toBe("foo#");
    expect(padEnd("hello", "0", 1)).toBe("o");
    expect(padEnd("hello", "0", 2)).toBe("lo");
    expect(padEnd("hello", "0", 3)).toBe("llo");
    expect(padEnd("hello", "0", 4)).toBe("ello");
    expect(padEnd("hello", "0", 5)).toBe("hello");
    expect(padEnd("hello", "0", 6)).toBe("hello0");
    expect(padEnd("hello", "@@", 5)).toBe("hello");
    expect(padEnd("hello", "@@", 6)).toBe("hello@");
    expect(padEnd("hello", "0", undefined)).toBe("hello");
    expect(padEnd("", "0", 1)).toBe("0");
    expect(padEnd(undefined, "@@", 6)).toBe(undefined);
    expect(padEnd(null, "@@", 6)).toBe(null);
  });

  it("leadingTime", () => {
    expect(leadingTime(0)).toBe("00");
    expect(leadingTime(5)).toBe("05");
    expect(leadingTime(10)).toBe("10");
    expect(leadingTime(24)).toBe("24");
    expect(leadingTime(59)).toBe("59");
    expect(leadingTime("11")).toBe("11");
    expect(leadingTime(null)).toBe(null);
  });

  it("toCurrencyFormat", () => {
    expect(toCurrencyFormat(-0.1)).toBe("-0.1");
    expect(toCurrencyFormat(-1.1)).toBe("-1.1");
    expect(toCurrencyFormat(-1.12)).toBe("-1.12");
    expect(toCurrencyFormat(-1.123)).toBe("-1.123");
    expect(toCurrencyFormat(-1.1234)).toBe("-1.1234");
    expect(toCurrencyFormat(-1.12345)).toBe("-1.12345");
    expect(toCurrencyFormat(-12.1234)).toBe("-12.1234");
    expect(toCurrencyFormat(-123.1234)).toBe("-123.1234");
    expect(toCurrencyFormat(-1234.1234)).toBe("-1,234.1234");
    expect(toCurrencyFormat(-12341234.1234)).toBe("-12,341,234.1234");

    expect(toCurrencyFormat(0)).toBe("0");
    expect(toCurrencyFormat(1234)).toBe("1,234");
    expect(toCurrencyFormat(1234567)).toBe("1,234,567");
    expect(toCurrencyFormat(0.9999)).toBe("0.9999");
    expect(toCurrencyFormat(1234.1234)).toBe("1,234.1234");

    let options: CurrencyPriceOption = { fixed: 2 };
    expect(toCurrencyFormat(0, options)).toBe("0.00");
    expect(toCurrencyFormat(1234, options)).toBe("1,234.00");
    expect(toCurrencyFormat(1234567, options)).toBe("1,234,567.00");
    expect(toCurrencyFormat(99.9999, options)).toBe("99.99");
    expect(toCurrencyFormat(0.9999, options)).toBe("0.99");
    expect(toCurrencyFormat(1234.1234, options)).toBe("1,234.12");

    options = { fixed: 6 };
    expect(toCurrencyFormat(0, options)).toBe("0.000000");
    expect(toCurrencyFormat(1234, options)).toBe("1,234.000000");
    expect(toCurrencyFormat(1234567, options)).toBe("1,234,567.000000");
    expect(toCurrencyFormat(99.9999, options)).toBe("99.999900");
    expect(toCurrencyFormat(0.9999, options)).toBe("0.999900");
    expect(toCurrencyFormat(1234.1234, options)).toBe("1,234.123400");

    options = { fixed: 2, replaceChar: "#" };
    expect(toCurrencyFormat(0, options)).toBe("0.00");
    expect(toCurrencyFormat(1234, options)).toBe("1#234.00");
    expect(toCurrencyFormat(1234567, options)).toBe("1#234#567.00");
    expect(toCurrencyFormat(99.9999, options)).toBe("99.99");
    expect(toCurrencyFormat(0.9999, options)).toBe("0.99");
    expect(toCurrencyFormat(1234.1234, options)).toBe("1#234.12");

    expect(toCurrencyFormat(null)).toBe(null);
    expect(toCurrencyFormat(undefined)).toBe(undefined);
  });

  it("leadingTime", () => {
    expect(leadingTime(0)).toBe("00");
    expect(leadingTime(5)).toBe("05");
    expect(leadingTime(10)).toBe("10");
    expect(leadingTime("0")).toBe("00");
    expect(leadingTime("5")).toBe("05");
    expect(leadingTime("10")).toBe("10");
    expect(leadingTime("00")).toBe("00");
    expect(leadingTime(-1)).toBe("-1");
  });

  it("insert", () => {
    expect(insert("abcde", 1, "@")).toBe("a@bcde");
    expect(insert("abcde", 5, "@")).toBe("abcde@");
    expect(insert("abcde", 11, "@")).toBe("abcde@");
    expect(insert("abcde", -12, "@")).toBe("@abcde");
    expect(insert("abcde", null, "@")).toBe("abcde");
  });

  it("replaceAll", () => {
    expect(replaceAll("a-b-c", "-", "@")).toBe("a@b@c");
    expect(replaceAll("a-b-c", "", "@")).toBe("a-b-c");
    expect(replaceAll("a-b-c", "-", "")).toBe("abc");
    expect(replaceAll("a-b-c", "-", undefined)).toBe("abc");
    expect(replaceAll(null, "-", "")).toBe(null);
    expect(replaceAll(undefined, "-", "")).toBe(undefined);
  });

  it("toUpperCaseHead", () => {
    expect(toUpperCaseHead("abc")).toBe("Abc");
    expect(toUpperCaseHead(" abc")).toBe(" abc");
    expect(toUpperCaseHead("")).toBe("");
  });

  it("toCamelFromSnake", () => {
    expect(toCamelFromSnake("user_name")).toBe("userName");
    expect(toCamelFromSnake("user__name")).toBe("user_Name");
    expect(toCamelFromSnake("user_last_name")).toBe("userLastName");
  });

  it("toCamelFromKebab", () => {
    expect(toCamelFromKebab("user-name")).toBe("userName");
    expect(toCamelFromKebab("user--name")).toBe("user-Name");
    expect(toCamelFromKebab("user-last-name")).toBe("userLastName");
  });

  it("toWordArray", () => {
    expect(toWordArray("hello foo bar")).toEqual(["hello", "foo", "bar"]);
    expect(toWordArray("  hello  foo bar  ")).toEqual(["hello", "foo", "bar"]);
    expect(toWordArray("")).toEqual([]);
  });

  it("removeTag", () => {
    /*eslint-disable */ // 줄바꿈 테스트로 lint 제외

    const test1 = `<h2 id="도구_자원">도구 &amp; 자원</h2>`;
    const test2 = `<p><strong>JavaScript</strong> 코드 작성과 디버깅</p>`;
    const test3 = `<div><h1>Complete beginners</h1>
<h2>first steps</h2></div>`;

    expect(removeTag("\t<div>AAA</div>\t\t<br/>BBB", false)).toBe(
      "\tAAA\t\tBBB"
    );
    expect(removeTag("\t<div>AAA</div>\t\t<br/>BBB", true)).toBe("AAABBB");
    expect(removeTag(test1)).toBe("도구 &amp; 자원");
    expect(removeTag(test2)).toBe("JavaScript 코드 작성과 디버깅");
    expect(removeTag(test3)).toBe(`Complete beginners
first steps`);

    /*eslint-enable */
  });

  it("collapseMultiline", () => {
    /*eslint-disable */ // 줄바꿈 테스트로 lint 제외

    expect(
      collapseMultiline(`1


      2`)
    ).toBe(`1

      2`);

    // 한줄 허용
    expect(
      collapseMultiline(
        `1


      2`,
        1
      )
    ).toBe(`1
      2`);
    /*eslint-enable */
  });

  it("toMaskingFirst", () => {
    expect(toMaskingFirst("0")).toBe("0");
    expect(toMaskingFirst("01")).toBe("*1");
    expect(toMaskingFirst("012")).toBe("**2");
    expect(toMaskingFirst("0123")).toBe("**23");
    expect(toMaskingFirst("01234")).toBe("***34");
    expect(toMaskingFirst("012345")).toBe("***345");
    expect(toMaskingFirst("0123456")).toBe("****456");
    expect(toMaskingFirst("01234567")).toBe("****4567");
    expect(toMaskingFirst("012345678")).toBe("*****5678");
    expect(toMaskingFirst("0123456789")).toBe("*****56789");
    expect(toMaskingFirst("0", { maxShow: 2 })).toBe("0");
    expect(toMaskingFirst("01", { maxShow: 2 })).toBe("*1");
    expect(toMaskingFirst("012", { maxShow: 2 })).toBe("**2");
    expect(toMaskingFirst("0123", { maxShow: 2 })).toBe("**23");
    expect(toMaskingFirst("01234", { maxShow: 2 })).toBe("***34");
    expect(toMaskingFirst("012345", { maxShow: 2 })).toBe("****45");
    expect(toMaskingFirst("0123456", { maxShow: 2 })).toBe("*****56");
    expect(toMaskingFirst("01234567", { maxShow: 2 })).toBe("******67");
    expect(toMaskingFirst("012345678", { maxShow: 2 })).toBe("*******78");
    expect(toMaskingFirst("0123456789", { maxShow: 2 })).toBe("********89");
    expect(toMaskingFirst("0", { maxShow: 3 })).toBe("0");
    expect(toMaskingFirst("01", { maxShow: 3 })).toBe("*1");
    expect(toMaskingFirst("012", { maxShow: 3 })).toBe("**2");
    expect(toMaskingFirst("0123", { maxShow: 3 })).toBe("**23");
    expect(toMaskingFirst("01234", { maxShow: 3 })).toBe("***34");
    expect(toMaskingFirst("012345", { maxShow: 3 })).toBe("***345");
    expect(toMaskingFirst("0123456", { maxShow: 3 })).toBe("****456");
    expect(toMaskingFirst("01234567", { maxShow: 3 })).toBe("*****567");
    expect(toMaskingFirst("012345678", { maxShow: 3 })).toBe("******678");
    expect(toMaskingFirst("0123456789", { maxShow: 3 })).toBe("*******789");
    expect(toMaskingFirst("0", { maxShow: 4 })).toBe("0");
    expect(toMaskingFirst("01", { maxShow: 4 })).toBe("*1");
    expect(toMaskingFirst("012", { maxShow: 4 })).toBe("**2");
    expect(toMaskingFirst("0123", { maxShow: 4 })).toBe("**23");
    expect(toMaskingFirst("01234", { maxShow: 4 })).toBe("***34");
    expect(toMaskingFirst("012345", { maxShow: 4 })).toBe("***345");
    expect(toMaskingFirst("0123456", { maxShow: 4 })).toBe("****456");
    expect(toMaskingFirst("01234567", { maxShow: 4 })).toBe("****4567");
    expect(toMaskingFirst("012345678", { maxShow: 4 })).toBe("*****5678");
    expect(toMaskingFirst("0123456789", { maxShow: 4 })).toBe("******6789");
    expect(toMaskingFirst("0", { maxShow: 5 })).toBe("0");
    expect(toMaskingFirst("01", { maxShow: 5 })).toBe("*1");
    expect(toMaskingFirst("012", { maxShow: 5 })).toBe("**2");
    expect(toMaskingFirst("0123", { maxShow: 5 })).toBe("**23");
    expect(toMaskingFirst("01234", { maxShow: 5 })).toBe("***34");
    expect(toMaskingFirst("012345", { maxShow: 5 })).toBe("***345");
    expect(toMaskingFirst("0123456", { maxShow: 5 })).toBe("****456");
    expect(toMaskingFirst("01234567", { maxShow: 5 })).toBe("****4567");
    expect(toMaskingFirst("012345678", { maxShow: 5 })).toBe("*****5678");
    expect(toMaskingFirst("0123456789", { maxShow: 5 })).toBe("*****56789");
    expect(toMaskingFirst("0123456789", { maxShow: 6 })).toBe("*****56789");
    expect(toMaskingFirst("0123456789", { maxShow: 7 })).toBe("*****56789");
    expect(toMaskingFirst("0123456789", { maxShow: 8 })).toBe("*****56789");
    expect(toMaskingFirst("0123456789", { maxShow: 9 })).toBe("*****56789");
  });

  it("toMaskingFirst", () => {
    expect(toMaskingLast("0")).toBe("0");
    expect(toMaskingLast("01")).toBe("0*");
    expect(toMaskingLast("012")).toBe("0**");
    expect(toMaskingLast("0123")).toBe("01**");
    expect(toMaskingLast("01234")).toBe("01***");
    expect(toMaskingLast("012345")).toBe("012***");
    expect(toMaskingLast("0123456")).toBe("012****");
    expect(toMaskingLast("01234567")).toBe("0123****");
    expect(toMaskingLast("012345678")).toBe("0123*****");
    expect(toMaskingLast("0123456789")).toBe("01234*****");
    expect(toMaskingLast("0", { maxShow: 2 })).toBe("0");
    expect(toMaskingLast("01", { maxShow: 2 })).toBe("0*");
    expect(toMaskingLast("012", { maxShow: 2 })).toBe("0**");
    expect(toMaskingLast("0123", { maxShow: 2 })).toBe("01**");
    expect(toMaskingLast("01234", { maxShow: 2 })).toBe("01***");
    expect(toMaskingLast("012345", { maxShow: 2 })).toBe("01****");
    expect(toMaskingLast("0123456", { maxShow: 2 })).toBe("01*****");
    expect(toMaskingLast("01234567", { maxShow: 2 })).toBe("01******");
    expect(toMaskingLast("012345678", { maxShow: 2 })).toBe("01*******");
    expect(toMaskingLast("0123456789", { maxShow: 2 })).toBe("01********");
    expect(toMaskingLast("0", { maxShow: 3 })).toBe("0");
    expect(toMaskingLast("01", { maxShow: 3 })).toBe("0*");
    expect(toMaskingLast("012", { maxShow: 3 })).toBe("0**");
    expect(toMaskingLast("0123", { maxShow: 3 })).toBe("01**");
    expect(toMaskingLast("01234", { maxShow: 3 })).toBe("01***");
    expect(toMaskingLast("012345", { maxShow: 3 })).toBe("012***");
    expect(toMaskingLast("0123456", { maxShow: 3 })).toBe("012****");
    expect(toMaskingLast("01234567", { maxShow: 3 })).toBe("012*****");
    expect(toMaskingLast("012345678", { maxShow: 3 })).toBe("012******");
    expect(toMaskingLast("0123456789", { maxShow: 3 })).toBe("012*******");
    expect(toMaskingLast("0", { maxShow: 4 })).toBe("0");
    expect(toMaskingLast("01", { maxShow: 4 })).toBe("0*");
    expect(toMaskingLast("012", { maxShow: 4 })).toBe("0**");
    expect(toMaskingLast("0123", { maxShow: 4 })).toBe("01**");
    expect(toMaskingLast("01234", { maxShow: 4 })).toBe("01***");
    expect(toMaskingLast("012345", { maxShow: 4 })).toBe("012***");
    expect(toMaskingLast("0123456", { maxShow: 4 })).toBe("012****");
    expect(toMaskingLast("01234567", { maxShow: 4 })).toBe("0123****");
    expect(toMaskingLast("012345678", { maxShow: 4 })).toBe("0123*****");
    expect(toMaskingLast("0123456789", { maxShow: 4 })).toBe("0123******");
    expect(toMaskingLast("0", { maxShow: 5 })).toBe("0");
    expect(toMaskingLast("01", { maxShow: 5 })).toBe("0*");
    expect(toMaskingLast("012", { maxShow: 5 })).toBe("0**");
    expect(toMaskingLast("0123", { maxShow: 5 })).toBe("01**");
    expect(toMaskingLast("01234", { maxShow: 5 })).toBe("01***");
    expect(toMaskingLast("012345", { maxShow: 5 })).toBe("012***");
    expect(toMaskingLast("0123456", { maxShow: 5 })).toBe("012****");
    expect(toMaskingLast("01234567", { maxShow: 5 })).toBe("0123****");
    expect(toMaskingLast("012345678", { maxShow: 5 })).toBe("0123*****");
    expect(toMaskingLast("0123456789", { maxShow: 5 })).toBe("01234*****");
    expect(toMaskingLast("0123456789", { maxShow: 6 })).toBe("01234*****");
    expect(toMaskingLast("0123456789", { maxShow: 7 })).toBe("01234*****");
    expect(toMaskingLast("0123456789", { maxShow: 8 })).toBe("01234*****");
    expect(toMaskingLast("0123456789", { maxShow: 9 })).toBe("01234*****");
  });

  it("toMaskingMiddle", () => {
    expect(toMaskingMiddle("0")).toBe("0");
    expect(toMaskingMiddle("01")).toBe("0*");
    expect(toMaskingMiddle("012")).toBe("0**");
    expect(toMaskingMiddle("0123")).toBe("0**3");
    expect(toMaskingMiddle("01234")).toBe("0***4");
    expect(toMaskingMiddle("012345")).toBe("01***5");
    expect(toMaskingMiddle("0123456")).toBe("01****6");
    expect(toMaskingMiddle("01234567")).toBe("01****67");
    expect(toMaskingMiddle("012345678")).toBe("01*****78");
    expect(toMaskingMiddle("0123456789")).toBe("012*****89");
    expect(toMaskingMiddle("0", { maxShow: 2 })).toBe("0");
    expect(toMaskingMiddle("01", { maxShow: 2 })).toBe("0*");
    expect(toMaskingMiddle("012", { maxShow: 2 })).toBe("0**");
    expect(toMaskingMiddle("0123", { maxShow: 2 })).toBe("0**3");
    expect(toMaskingMiddle("01234", { maxShow: 2 })).toBe("0***4");
    expect(toMaskingMiddle("012345", { maxShow: 2 })).toBe("0****5");
    expect(toMaskingMiddle("0123456", { maxShow: 2 })).toBe("0*****6");
    expect(toMaskingMiddle("01234567", { maxShow: 2 })).toBe("0******7");
    expect(toMaskingMiddle("012345678", { maxShow: 2 })).toBe("0*******8");
    expect(toMaskingMiddle("0123456789", { maxShow: 2 })).toBe("0********9");
    expect(toMaskingMiddle("0", { maxShow: 3 })).toBe("0");
    expect(toMaskingMiddle("01", { maxShow: 3 })).toBe("0*");
    expect(toMaskingMiddle("012", { maxShow: 3 })).toBe("0**");
    expect(toMaskingMiddle("0123", { maxShow: 3 })).toBe("0**3");
    expect(toMaskingMiddle("01234", { maxShow: 3 })).toBe("0***4");
    expect(toMaskingMiddle("012345", { maxShow: 3 })).toBe("01***5");
    expect(toMaskingMiddle("0123456", { maxShow: 3 })).toBe("01****6");
    expect(toMaskingMiddle("01234567", { maxShow: 3 })).toBe("01*****7");
    expect(toMaskingMiddle("012345678", { maxShow: 3 })).toBe("01******8");
    expect(toMaskingMiddle("0123456789", { maxShow: 3 })).toBe("01*******9");
    expect(toMaskingMiddle("0", { maxShow: 4 })).toBe("0");
    expect(toMaskingMiddle("01", { maxShow: 4 })).toBe("0*");
    expect(toMaskingMiddle("012", { maxShow: 4 })).toBe("0**");
    expect(toMaskingMiddle("0123", { maxShow: 4 })).toBe("0**3");
    expect(toMaskingMiddle("01234", { maxShow: 4 })).toBe("0***4");
    expect(toMaskingMiddle("012345", { maxShow: 4 })).toBe("01***5");
    expect(toMaskingMiddle("0123456", { maxShow: 4 })).toBe("01****6");
    expect(toMaskingMiddle("01234567", { maxShow: 4 })).toBe("01****67");
    expect(toMaskingMiddle("012345678", { maxShow: 4 })).toBe("01*****78");
    expect(toMaskingMiddle("0123456789", { maxShow: 4 })).toBe("01******89");
    expect(toMaskingMiddle("0", { maxShow: 5 })).toBe("0");
    expect(toMaskingMiddle("01", { maxShow: 5 })).toBe("0*");
    expect(toMaskingMiddle("012", { maxShow: 5 })).toBe("0**");
    expect(toMaskingMiddle("0123", { maxShow: 5 })).toBe("0**3");
    expect(toMaskingMiddle("01234", { maxShow: 5 })).toBe("0***4");
    expect(toMaskingMiddle("012345", { maxShow: 5 })).toBe("01***5");
    expect(toMaskingMiddle("0123456", { maxShow: 5 })).toBe("01****6");
    expect(toMaskingMiddle("01234567", { maxShow: 5 })).toBe("01****67");
    expect(toMaskingMiddle("012345678", { maxShow: 5 })).toBe("01*****78");
    expect(toMaskingMiddle("0123456789", { maxShow: 5 })).toBe("012*****89");
    expect(toMaskingMiddle("0123456789", { maxShow: 6 })).toBe("012*****89");
    expect(toMaskingMiddle("0123456789", { maxShow: 7 })).toBe("012*****89");
    expect(toMaskingMiddle("0123456789", { maxShow: 8 })).toBe("012*****89");
    expect(toMaskingMiddle("0123456789", { maxShow: 9 })).toBe("012*****89");
  });

  it("toMaskingJustify", () => {
    expect(toMaskingJustify("0")).toBe("0");
    expect(toMaskingJustify("01")).toBe("*1");
    expect(toMaskingJustify("012")).toBe("*1*");
    expect(toMaskingJustify("0123")).toBe("*12*");
    expect(toMaskingJustify("01234")).toBe("**23*");
    expect(toMaskingJustify("012345")).toBe("**234*");
    expect(toMaskingJustify("0123456")).toBe("**234**");
    expect(toMaskingJustify("01234567")).toBe("**2345**");
    expect(toMaskingJustify("012345678")).toBe("***3456**");
    expect(toMaskingJustify("0123456789")).toBe("***34567**");
    expect(toMaskingJustify("0", { maxShow: 2 })).toBe("0");
    expect(toMaskingJustify("01", { maxShow: 2 })).toBe("*1");
    expect(toMaskingJustify("012", { maxShow: 2 })).toBe("*1*");
    expect(toMaskingJustify("0123", { maxShow: 2 })).toBe("*12*");
    expect(toMaskingJustify("01234", { maxShow: 2 })).toBe("**23*");
    expect(toMaskingJustify("012345", { maxShow: 2 })).toBe("**23**");
    expect(toMaskingJustify("0123456", { maxShow: 2 })).toBe("***34**");
    expect(toMaskingJustify("01234567", { maxShow: 2 })).toBe("***34***");
    expect(toMaskingJustify("012345678", { maxShow: 2 })).toBe("****45***");
    expect(toMaskingJustify("0123456789", { maxShow: 2 })).toBe("****45****");
    expect(toMaskingJustify("0", { maxShow: 3 })).toBe("0");
    expect(toMaskingJustify("01", { maxShow: 3 })).toBe("*1");
    expect(toMaskingJustify("012", { maxShow: 3 })).toBe("*1*");
    expect(toMaskingJustify("0123", { maxShow: 3 })).toBe("*12*");
    expect(toMaskingJustify("01234", { maxShow: 3 })).toBe("**23*");
    expect(toMaskingJustify("012345", { maxShow: 3 })).toBe("**234*");
    expect(toMaskingJustify("0123456", { maxShow: 3 })).toBe("**234**");
    expect(toMaskingJustify("01234567", { maxShow: 3 })).toBe("***345**");
    expect(toMaskingJustify("012345678", { maxShow: 3 })).toBe("***345***");
    expect(toMaskingJustify("0123456789", { maxShow: 3 })).toBe("****456***");
    expect(toMaskingJustify("0", { maxShow: 4 })).toBe("0");
    expect(toMaskingJustify("01", { maxShow: 4 })).toBe("*1");
    expect(toMaskingJustify("012", { maxShow: 4 })).toBe("*1*");
    expect(toMaskingJustify("0123", { maxShow: 4 })).toBe("*12*");
    expect(toMaskingJustify("01234", { maxShow: 4 })).toBe("**23*");
    expect(toMaskingJustify("012345", { maxShow: 4 })).toBe("**234*");
    expect(toMaskingJustify("0123456", { maxShow: 4 })).toBe("**234**");
    expect(toMaskingJustify("01234567", { maxShow: 4 })).toBe("**2345**");
    expect(toMaskingJustify("012345678", { maxShow: 4 })).toBe("***3456**");
    expect(toMaskingJustify("0123456789", { maxShow: 4 })).toBe("***3456***");
    expect(toMaskingJustify("0", { maxShow: 5 })).toBe("0");
    expect(toMaskingJustify("01", { maxShow: 5 })).toBe("*1");
    expect(toMaskingJustify("012", { maxShow: 5 })).toBe("*1*");
    expect(toMaskingJustify("0123", { maxShow: 5 })).toBe("*12*");
    expect(toMaskingJustify("01234", { maxShow: 5 })).toBe("**23*");
    expect(toMaskingJustify("012345", { maxShow: 5 })).toBe("**234*");
    expect(toMaskingJustify("0123456", { maxShow: 5 })).toBe("**234**");
    expect(toMaskingJustify("01234567", { maxShow: 5 })).toBe("**2345**");
    expect(toMaskingJustify("012345678", { maxShow: 5 })).toBe("***3456**");
    expect(toMaskingJustify("0123456789", { maxShow: 5 })).toBe("***34567**");
    expect(toMaskingJustify("0123456789", { maxShow: 6 })).toBe("***34567**");
    expect(toMaskingJustify("0123456789", { maxShow: 7 })).toBe("***34567**");
    expect(toMaskingJustify("0123456789", { maxShow: 8 })).toBe("***34567**");
    expect(toMaskingJustify("0123456789", { maxShow: 9 })).toBe("***34567**");
  });
});
