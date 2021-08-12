import { StorageCast } from "projects/packages/web/storage-cast/StorageCast";

const TEST_STORAGE_KEY = 'temp-cast'

describe('StorageCast', () => {
  let storageCast: StorageCast;
  let otherWindow: Window & {
    storageCast?: StorageCast;
  } = null
  beforeAll(() => {
    otherWindow = window.open()
    otherWindow.storageCast = new StorageCast()
    otherWindow.storageCast.bindWindow(otherWindow)
    otherWindow.storageCast.init({ storageKey: TEST_STORAGE_KEY });
  })
  beforeEach(() => {
    storageCast = new StorageCast();
    storageCast.init({ storageKey: TEST_STORAGE_KEY });
  });
  afterEach(() => {
    storageCast.destroy();
    storageCast = null;
  });
  afterAll(() => {
    otherWindow.storageCast.destroy();
    otherWindow.close()
    otherWindow = undefined;
  });

  it('dispatch & observe event', async (testDone) => {
    storageCast.observe('test-event', (evt) => {
      expect(evt.dispatchValue.articleId).toBe(99)
      expect(evt.dispatchValue.like).toBe(true)
      testDone()
    })
    otherWindow.storageCast.dispatch('test-event', { articleId: 99, like: true });
  });

  it('dispatch & observe event #2', async (testDone) => {
    let count = 0;
    storageCast.observe('test-event', (evt) => count += 1)
    storageCast.observe('test-event2', (evt) => count += 10)
    storageCast.observe('test-event', (evt) => {
      expect(count).toBe(1)
      testDone()
    })
    otherWindow.storageCast.dispatch('test-event', { articleId: 99, like: true });
  });
});