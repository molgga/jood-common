import { BrowserScroll } from "projects/packages/web/browser-scroll";
import { Subscription } from 'rxjs';

interface SpyMocks {
  mockScrollTop?: jasmine.Spy;
  mockScrollHeight?: jasmine.Spy;
  mockInnerHeight?: jasmine.Spy;
}

function spyCreate(browserScroll: BrowserScroll) {
  const mockScrollTop = spyOnProperty(browserScroll, 'scrollTop');
  const mockScrollHeight = spyOnProperty(browserScroll, 'scrollHeight');
  const mockInnerHeight = spyOnProperty(browserScroll, 'innerHeight');
  return {
    mockScrollTop,
    mockScrollHeight,
    mockInnerHeight,
  }
}

function spyScroll(mocks: SpyMocks, { scrollTop, scrollHeight, innerHeight}, scrollEvent = true) {
  const { mockScrollTop, mockScrollHeight, mockInnerHeight } = mocks;
  if (mockScrollTop && !isNaN(scrollTop)) mockScrollTop.and.returnValue(scrollTop);
  if (mockScrollHeight && !isNaN(scrollHeight)) mockScrollHeight.and.returnValue(scrollHeight);
  if (mockInnerHeight && !isNaN(innerHeight)) mockInnerHeight.and.returnValue(innerHeight);
  if (scrollEvent) {
    triggerScrollEvent();
  }
  return {
    mockScrollTop,
    mockScrollHeight,
    mockInnerHeight,
  };
}

function spyClear(mocks: SpyMocks) {
  const { mockScrollTop, mockScrollHeight, mockInnerHeight } = mocks;
  if (mockScrollTop) mockScrollTop.and.callThrough();
  if (mockScrollHeight) mockScrollHeight.and.callThrough();
  if (mockInnerHeight) mockInnerHeight.and.callThrough();
}

function triggerScrollEvent() {
  window.dispatchEvent(new Event('scroll'));
}

function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), duration);
  });
}

describe('BrowserScroll', () => {
  const listener: Subscription = new Subscription();
  let browserScroll: BrowserScroll;

  beforeEach(() => {
    browserScroll = new BrowserScroll();
    browserScroll.init();
  });

  afterEach(() => {
    browserScroll.destroy();
    browserScroll = null;
  });

  afterAll(() => {
    listener.unsubscribe();
  });

  it('setScroll',  (testDone) => {
    expect(browserScroll.scrollTop).toBe(0);
    document.body.style.height = '10000px';
    browserScroll.setScroll(5, 0);
    expect(browserScroll.scrollTop).toBe(5);
    document.body.style.removeProperty('height');
    testDone();
  });

  it('setScrollTo',  async (testDone) => {
    expect(browserScroll.scrollTop).toBe(0);
    document.body.style.height = '10000px';
    browserScroll.setScrollTo(5, 0, true); // animate 되는거라 테스트 환경에 따라 차이가 있을듯, 문제가 된다면 제거 필요.
    await delay(200);
    expect(browserScroll.scrollTop).toBe(5);
    document.body.style.removeProperty('height');
    testDone();
  });

  it('resize',  (testDone) => {
    const mockScroll = spyOn(browserScroll, 'dispatchScroll');
    expect(mockScroll.calls.count()).toBe(0);
    window.dispatchEvent(new Event('resize'));
    expect(mockScroll.calls.count()).toBe(1);
    testDone();
  });

  it('observeScroll', (testDone) => {
    const expectScrollTops = [];
    const observe = browserScroll.observeScroll().subscribe(state => {
      expectScrollTops.push(state.scrollTop);
    });
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollTop: 10, scrollHeight: 200, innerHeight: 100 });
    spyScroll(mocks, { scrollTop: 20, scrollHeight: 200, innerHeight: 100 });
    spyScroll(mocks, { scrollTop: 30, scrollHeight: 200, innerHeight: 100 });
    spyScroll(mocks, { scrollTop: 40, scrollHeight: 200, innerHeight: 100 });
    spyScroll(mocks, { scrollTop: 50, scrollHeight: 200, innerHeight: 100 });
    expect(expectScrollTops).toEqual([10,20,30,40,50]);
    testDone();
  });

  it('observeDirectionY', (testDone) => {
    let expectDirection = 0;
    const observe = browserScroll.observeDirectionY().subscribe(state => {
      expectDirection = state.directionY;
    });
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollTop: 0, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(0);
    spyScroll(mocks, { scrollTop: 10, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollTop: 20, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollTop: 10, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(-1);
    spyScroll(mocks, { scrollTop: 20, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(1);
    testDone();
  });

  it('observeDirectionLooseY', (testDone) => {
    let expectDirection = 0;
    const observe = browserScroll.observeDirectionLooseY().subscribe(state => {
      expectDirection = state.directionY;
    });
    browserScroll.setDirectionLooseGapY(20);
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollTop: 0, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(0);
    spyScroll(mocks, { scrollTop: 10, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(0);
    spyScroll(mocks, { scrollTop: 30, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollTop: 20, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollTop: 0, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(-1);
    spyScroll(mocks, { scrollTop: 20, scrollHeight: 200, innerHeight: 100 });
    expect(expectDirection).toBe(1);
    testDone();
  });

  it('observeHalfEndY', (testDone) => {
    let expectCalled = false;
    const observe = browserScroll.observeHalfEndY().subscribe(state => {
      expectCalled = true;
    });
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollTop: 10, scrollHeight: 200, innerHeight: 100 });
    expect(expectCalled).toBe(false);
    spyScroll(mocks, { scrollTop: 49, scrollHeight: 200, innerHeight: 100 });
    expect(expectCalled).toBe(false);
    spyScroll(mocks, { scrollTop: 50, scrollHeight: 200, innerHeight: 100 });
    expect(expectCalled).toBe(true);
    testDone();
  });

  it('observeEndY', (testDone) => {
    let expectCalled = false;
    const observe = browserScroll.observeEndY().subscribe(state => {
      expectCalled = true;
    });
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollTop: 10, scrollHeight: 200, innerHeight: 100 });
    expect(expectCalled).toBe(false);
    spyScroll(mocks, { scrollTop: 99, scrollHeight: 200, innerHeight: 100 });
    expect(expectCalled).toBe(false);
    spyScroll(mocks, { scrollTop: 100, scrollHeight: 200, innerHeight: 100 });
    expect(expectCalled).toBe(true);
    testDone();
  });
});