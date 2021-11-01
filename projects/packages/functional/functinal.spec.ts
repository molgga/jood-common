import { debounce, delay } from "./public-api";

describe("functinal", () => {
  it("debounce", (testDone) => {
    let callCount = 0;
    function executeDebounce() {
      callCount++;
    }

    const onDebounce = debounce(executeDebounce, 100);
    onDebounce();
    onDebounce();
    onDebounce();
    onDebounce();
    onDebounce();
    setTimeout(() => {
      expect(callCount).toBe(1);
      testDone();
    }, 150);
  });

  it("delay", async () => {
    let isCalled = false;
    setTimeout(() => {
      expect(isCalled).toBe(false);
    }, 20);
    setTimeout(() => {
      expect(isCalled).toBe(true);
    }, 60);
    await delay(40);
    isCalled = true;
    await delay(80);
    return Promise.resolve(true);
  });
});