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
  collapseMultiline
} from "./utils";

describe("string utils", () => {
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

  it("toStringSplitMiddle", () => {
    const test1 =
      "https://developers.google.com/web/fundamentals/architecture/app-shell";
    const test2 = "0123456789012345678901234567890123456789";
    const test3 = "0123456789";
    expect(toEllipsisEnd(test1, 10)).toBe("https://de...");
    expect(toEllipsisEnd(test2, 20)).toBe("01234567890123456789...");
    expect(toEllipsisEnd(test3, 9)).toBe("012345678...");
    expect(toEllipsisEnd(test3, 5)).toBe("01234...");
    expect(toEllipsisEnd(test3, 11)).toBe("0123456789");
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
    expect(toEllipsisMiddle(test3, 11)).toBe("0123456789");
  });

  it("padStart", () => {
    expect(padStart(1, "0", 2)).toBe("01");
    expect(padStart("1", "0", 2)).toBe("01");
    expect(padStart("123", "0", 5)).toBe("00123");
    expect(padStart("foo", "#", 3)).toBe("foo");
    expect(padStart("foo", "#", 4)).toBe("#foo");
    expect(padStart("hello", "@@", 5)).toBe("hello");
    expect(padStart("hello", "@@", 6)).toBe("@hello");
  });

  it("padEnd", () => {
    expect(padEnd(1, "0", 2)).toBe("10");
    expect(padEnd("1", "0", 2)).toBe("10");
    expect(padEnd("123", "0", 5)).toBe("12300");
    expect(padEnd("foo", "#", 3)).toBe("foo");
    expect(padEnd("foo", "#", 4)).toBe("foo#");
    expect(padEnd("hello", "@@", 5)).toBe("hello");
    expect(padEnd("hello", "@@", 6)).toBe("hello@");
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
    const test1 = `<h2 id="도구_자원">도구 &amp; 자원</h2>`;
    const test2 = `<p><strong>JavaScript</strong> 코드 작성과 디버깅</p>`;
    const test3 = `<div><h1>Complete beginners</h1>
<h2>first steps</h2></div>`;
    expect(removeTag(test1)).toBe("도구 &amp; 자원");
    expect(removeTag(test2)).toBe("JavaScript 코드 작성과 디버깅");
    expect(removeTag(test3)).toBe(`Complete beginners
first steps`);
  });

  it("collapseMultiline", () => {
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
  });
});
