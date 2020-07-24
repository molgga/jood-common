import {
  availableOr,
  insert,
  tail,
  extract,
  distinct,
  uniqueFilter,
  shuffle,
  transposeRow,
  transposeRowFilter,
} from "./utils";

describe("array utils", () => {
  it("uniqueFilter", () => {
    const arr1 = [
      { id: 1, name: "google" },
      { id: 2, name: "microsoft" },
      { id: 1, name: "google" },
      { id: 3, name: "amazone" },
    ];
    const idFilter = (item) => {
      return item.id;
    };
    const nameFilter = (item) => {
      return item.name;
    };
    expect(arr1.filter(uniqueFilter(idFilter))).toEqual([
      { id: 1, name: "google" },
      { id: 2, name: "microsoft" },
      { id: 3, name: "amazone" },
    ]);
    expect(arr1.filter(uniqueFilter(nameFilter))).toEqual([
      { id: 1, name: "google" },
      { id: 2, name: "microsoft" },
      { id: 3, name: "amazone" },
    ]);
  });

  it("distinct", () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 1, 3, 4, 4, 3, 5, 1];
    const arr3 = [
      { id: 1, name: "google" },
      { id: 2, name: "microsoft" },
      { id: 1, name: "google" },
      { id: 3, name: "amazone" },
    ];

    expect(distinct(arr1)).toEqual([1, 2, 3, 4, 5]);
    expect(distinct(arr2)).toEqual([1, 2, 3, 4, 5]);
    expect(
      distinct(arr3, (item) => {
        return item.id;
      })
    ).toEqual([
      { id: 1, name: "google" },
      { id: 2, name: "microsoft" },
      { id: 3, name: "amazone" },
    ]);
  });

  it("extract", () => {
    expect(extract([1, 2, 3, 4])).toEqual([2, 3, 4]);
    expect(extract([1, 2, 3, 4], 1, 1)).toEqual([1, 3, 4]);
    expect(extract([1, 2, 3, 4], 2, 1)).toEqual([1, 2, 4]);
    expect(extract([1, 2, 3, 4], 3, 1)).toEqual([1, 2, 3]);
    expect(extract([1, 2, 3, 4], 0, 2)).toEqual([3, 4]);
    expect(extract([1, 2, 3, 4], 0, 10)).toEqual([]);
    expect(extract([1, 2, 3, 4], 2, 10)).toEqual([1, 2]);

    const origin = [1, 2, 3, 4];
    expect(extract(origin, -1, 10)).toBe(origin);
  });

  it("tail", () => {
    const arr1 = [1, 2, 3, 4];
    expect(tail(arr1, -1)).toBe(4);
    expect(tail(arr1, 0)).toBe(4);
    expect(tail(arr1, 1)).toBe(3);
    expect(tail(arr1, 2)).toBe(2);
    expect(tail(arr1, 3)).toBe(1);
    expect(tail(arr1, 4)).toBe(1);
    expect(tail(arr1, 5)).toBe(1);

    const arr2 = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
    expect(tail(arr2, -1)).toEqual({ a: 4 });
    expect(tail(arr2, 0)).toEqual({ a: 4 });
    expect(tail(arr2, 1)).toEqual({ a: 3 });
    expect(tail(arr2, 2)).toEqual({ a: 2 });
    expect(tail(arr2, 3)).toEqual({ a: 1 });
    expect(tail(arr2, 4)).toEqual({ a: 1 });
    expect(tail(arr2, 5)).toEqual({ a: 1 });

    const arr3 = [1, "s", { a: 3 }];
    expect(tail(arr3, 0)).toEqual({ a: 3 });
    expect(tail(arr3, 1)).toBe("s");

    const arr4 = [1, 2, 3, 4];
    expect(tail(arr4, 10, false)).toBe(undefined);
    expect(tail(arr4, 10, true)).toBe(1);
    expect(tail(arr4, undefined)).toBe(4);
  });

  it("availableOr", () => {
    enum TestEnum {
      A = 100,
      B = 200,
      C = 300,
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

    expect(availableOr(undefined, 10)).toBe(null);
    expect(availableOr(undefined, 10, "Unknown")).toBe("Unknown");
  });

  it("insert", () => {
    expect(insert([1, 2, 3], 1, 99)).toEqual([1, 99, 2, 3]);
    expect(insert([1, 2, 3], 1, ["A", "B"])).toEqual([1, "A", "B", 2, 3]);
    expect(insert([1, 2, 3], 10, 99)).toEqual([1, 2, 3, 99]);
    expect(insert([1, 2, 3], 10, ["A", "B"])).toEqual([1, 2, 3, "A", "B"]);
    expect(insert([1, 2, 3], null, "A")).toEqual(["A", 1, 2, 3]);
    expect(insert([1, 2, 3], undefined, "A")).toEqual(["A", 1, 2, 3]);
  });

  it("shuffle", () => {
    const origin = [1, 2, 3, 4];
    const originLen = origin.length;
    for (let i = 0; i < 10; i++) {
      shuffle(origin);
      expect(origin.length).toBe(originLen);
    }
  });

  it("transposeRow", () => {
    const A = { id: 1, name: "A" };
    const B = { id: 2, name: "B" };
    const C = { id: 3, name: "C" };
    const D = { id: 4, name: "D" };
    const arr = [A, B, C, D];
    const rows = transposeRow(arr);
    expect(rows.length).toBe(4);
    expect(rows[0].length).toBe(4);
    expect(rows[1].length).toBe(4);
    expect(rows[2].length).toBe(4);
    expect(rows[3].length).toBe(4);
    expect(rows[0][0]).toBe(A);
    expect(rows[0][1]).toBe(B);
    expect(rows[0][2]).toBe(C);
    expect(rows[0][3]).toBe(D);
    expect(rows[1][0]).toBe(A);
    expect(rows[1][1]).toBe(B);
    expect(rows[1][2]).toBe(C);
    expect(rows[1][3]).toBe(D);
    expect(rows[2][0]).toBe(A);
    expect(rows[2][1]).toBe(B);
    expect(rows[2][2]).toBe(C);
    expect(rows[2][3]).toBe(D);
    expect(rows[3][0]).toBe(A);
    expect(rows[3][1]).toBe(B);
    expect(rows[3][2]).toBe(C);
    expect(rows[3][3]).toBe(D);
  });

  it("transposeRowFilter", () => {
    const A = { id: 1, name: "A" };
    const B = { id: 2, name: "B" };
    const C = { id: 3, name: "C" };
    const D = { id: 4, name: "D" };
    const arr = [A, B, C, D];
    const rows = transposeRowFilter(arr, (params) => {
      const { rowIndex, columnIndex, item } = params;
      return {
        ...item,
        myValue1: item.name.toLowerCase(),
        rowIndex,
        columnIndex,
      };
    });
    expect(rows.length).toBe(4);
    expect(rows[0].length).toBe(4);
    expect(rows[1].length).toBe(4);
    expect(rows[2].length).toBe(4);
    expect(rows[3].length).toBe(4);
    expect(rows[0][0].myValue1).toBe("a");
    expect(rows[0][1].myValue1).toBe("b");
    expect(rows[0][2].myValue1).toBe("c");
    expect(rows[0][3].myValue1).toBe("d");
    expect(rows[0][0].rowIndex).toBe(0);
    expect(rows[0][1].rowIndex).toBe(0);
    expect(rows[0][2].rowIndex).toBe(0);
    expect(rows[0][3].rowIndex).toBe(0);
    expect(rows[0][0].columnIndex).toBe(0);
    expect(rows[0][1].columnIndex).toBe(1);
    expect(rows[0][2].columnIndex).toBe(2);
    expect(rows[0][3].columnIndex).toBe(3);
    expect(rows[1][0].myValue1).toBe("a");
    expect(rows[1][1].myValue1).toBe("b");
    expect(rows[1][2].myValue1).toBe("c");
    expect(rows[1][3].myValue1).toBe("d");
    expect(rows[1][0].rowIndex).toBe(1);
    expect(rows[1][1].rowIndex).toBe(1);
    expect(rows[1][2].rowIndex).toBe(1);
    expect(rows[1][3].rowIndex).toBe(1);
    expect(rows[1][0].columnIndex).toBe(0);
    expect(rows[1][1].columnIndex).toBe(1);
    expect(rows[1][2].columnIndex).toBe(2);
    expect(rows[1][3].columnIndex).toBe(3);
    expect(rows[2][0].myValue1).toBe("a");
    expect(rows[2][1].myValue1).toBe("b");
    expect(rows[2][2].myValue1).toBe("c");
    expect(rows[2][3].myValue1).toBe("d");
    expect(rows[2][0].rowIndex).toBe(2);
    expect(rows[2][1].rowIndex).toBe(2);
    expect(rows[2][2].rowIndex).toBe(2);
    expect(rows[2][3].rowIndex).toBe(2);
    expect(rows[2][0].columnIndex).toBe(0);
    expect(rows[2][1].columnIndex).toBe(1);
    expect(rows[2][2].columnIndex).toBe(2);
    expect(rows[2][3].columnIndex).toBe(3);
    expect(rows[3][0].myValue1).toBe("a");
    expect(rows[3][1].myValue1).toBe("b");
    expect(rows[3][2].myValue1).toBe("c");
    expect(rows[3][3].myValue1).toBe("d");
    expect(rows[3][0].rowIndex).toBe(3);
    expect(rows[3][1].rowIndex).toBe(3);
    expect(rows[3][2].rowIndex).toBe(3);
    expect(rows[3][3].rowIndex).toBe(3);
    expect(rows[3][0].columnIndex).toBe(0);
    expect(rows[3][1].columnIndex).toBe(1);
    expect(rows[3][2].columnIndex).toBe(2);
    expect(rows[3][3].columnIndex).toBe(3);
  });
});
