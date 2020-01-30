import { availableOr, insert } from "./utils";

describe("array utils", () => {
  it("availableOr", () => {
    enum TestEnum {
      A = 100,
      B = 200,
      C = 300
    }

    const available1 = [10, 20, 30];
    const available2 = Object.assign(TestEnum);

    expect(availableOr(available1, 10, 10)).toBe(10);
    expect(availableOr(available1, 20, 10)).toBe(20);
    expect(availableOr(available1, 30, 10)).toBe(30);
    expect(availableOr(available1, 30, null)).toBe(30);
    expect(availableOr(available1, 99, 10)).toBe(10);
    expect(availableOr(available1, 99, 20)).toBe(20);
    expect(availableOr(available1, 99, 30)).toBe(30);
    expect(availableOr(available1, 99, null)).toBe(null);

    expect(availableOr(available2, 100, TestEnum.A)).toBe(100);
    expect(availableOr(available2, 200, TestEnum.B)).toBe(200);
    expect(availableOr(available2, 300, TestEnum.C)).toBe(300);

    expect(availableOr(available2, 99, TestEnum.A)).toBe(100);
    expect(availableOr(available2, 99, TestEnum.B)).toBe(200);
    expect(availableOr(available2, 99, TestEnum.C)).toBe(300);
  });

  it("insert", () => {
    expect(insert([1, 2, 3], 1, 99)).toEqual([1, 99, 2, 3]);
    expect(insert([1, 2, 3], 1, ["A", "B"])).toEqual([1, "A", "B", 2, 3]);
    expect(insert([1, 2, 3], 10, 99)).toEqual([1, 2, 3, 99]);
    expect(insert([1, 2, 3], 10, ["A", "B"])).toEqual([1, 2, 3, "A", "B"]);
    expect(insert([1, 2, 3], null, "A")).toEqual(["A", 1, 2, 3]);
  });
});
