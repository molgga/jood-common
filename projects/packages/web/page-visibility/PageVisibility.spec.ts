import { PageVisibility } from "projects/packages/web/page-visibility/PageVisibility";

function triggerVisibileEvent(eventName = 'visibilitychange') {
  document.dispatchEvent(new Event(eventName));
}

describe('PageVisibility', () => {
  let pageVisibility: PageVisibility;
  beforeEach(() => {
    pageVisibility = new PageVisibility();
    pageVisibility.init();
  });
  afterEach(() => {
    pageVisibility.destroy();
  });

  it('getState', () => {
    const spy = spyOn(pageVisibility, 'isHidden');
    spy.and.returnValue(true);
    expect(pageVisibility.getState().hidden).toBe(true);
    spy.and.returnValue(false);
    expect(pageVisibility.getState().hidden).toBe(false);
    spy.and.callThrough();
  });

  it('observeState', () => {
    let callCount = 0;
    const observe = pageVisibility.observeState().subscribe(() => {
      callCount++;
    });
    triggerVisibileEvent();
    expect(callCount).toBe(1);
    triggerVisibileEvent();
    expect(callCount).toBe(2);
  });
});