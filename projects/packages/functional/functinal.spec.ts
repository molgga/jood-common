import { debounce, delay } from "./public-api";

describe("functinal", () => {
  it("debounce", async (testDone) => {
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

  it("delay", async (testDone) => {
    let isCalled = false;
    setTimeout(() => {
      expect(isCalled).toBe(false);
      testDone();
    }, 100);
    await delay(150);
    isCalled = true;
  });
});