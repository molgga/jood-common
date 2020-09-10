import { Subscription } from 'rxjs';
import { BrowserScroll } from "./BrowserScroll";

interface SpyMocks {
  mockScrollTop?: jasmine.Spy;
  mockScrollHeight?: jasmine.Spy;
  mockInnerHeight?: jasmine.Spy;
  mockScrollLeft?: jasmine.Spy;
  mockScrollWidth?: jasmine.Spy;
  mockInnerWidth?: jasmine.Spy;
}

function spyCreate(browserScroll: BrowserScroll) {
  const mockScrollTop = spyOnProperty(browserScroll, 'scrollTop');
  const mockScrollHeight = spyOnProperty(browserScroll, 'scrollHeight');
  const mockInnerHeight = spyOnProperty(browserScroll, 'innerHeight');
  const mockScrollLeft = spyOnProperty(browserScroll, 'scrollLeft');
  const mockScrollWidth = spyOnProperty(browserScroll, 'scrollWidth');
  const mockInnerWidth = spyOnProperty(browserScroll, 'innerWidth');
  return {
    mockScrollTop,
    mockScrollHeight,
    mockInnerHeight,
    mockScrollLeft,
    mockScrollWidth,
    mockInnerWidth,
  }
}

interface SpyProps {
  scrollTop?: number;
  scrollHeight?: number;
  innerHeight?: number; 
  scrollLeft?: number;
  scrollWidth?: number;
  innerWidth?: number;
}

function spyScroll(mocks: SpyMocks, props: SpyProps, scrollEvent = true) {
  const { scrollTop, scrollHeight, innerHeight, scrollLeft, scrollWidth, innerWidth} = props;
  const { mockScrollTop, mockScrollHeight, mockInnerHeight, mockScrollLeft, mockScrollWidth, mockInnerWidth } = mocks;
  if (mockScrollTop && !isNaN(scrollTop)) mockScrollTop.and.returnValue(scrollTop);
  if (mockScrollHeight && !isNaN(scrollHeight)) mockScrollHeight.and.returnValue(scrollHeight);
  if (mockInnerHeight && !isNaN(innerHeight)) mockInnerHeight.and.returnValue(innerHeight);
  if (mockScrollLeft && !isNaN(scrollLeft)) mockScrollLeft.and.returnValue(scrollLeft);
  if (mockScrollWidth && !isNaN(scrollWidth)) mockScrollWidth.and.returnValue(scrollWidth);
  if (mockInnerWidth && !isNaN(innerWidth)) mockInnerWidth.and.returnValue(innerWidth);
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
    const mockScroll = spyOnProperty(browserScroll, 'scrollTop');
    expect(mockScroll.calls.count()).toBe(0);
    window.dispatchEvent(new Event('resize'));
    expect(1 <= mockScroll.calls.count()).toBe(true);
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

  it('observeDirectionX', (testDone) => {
    let expectDirection = 0;
    const observe = browserScroll.observeDirectionX().subscribe(state => {
      expectDirection = state.directionX;
    });
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollLeft: 0, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(0);
    spyScroll(mocks, { scrollLeft: 10, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollLeft: 20, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollLeft: 10, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(-1);
    spyScroll(mocks, { scrollLeft: 20, scrollWidth: 200, innerWidth: 100 });
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


  it('observeDirectionLooseX', (testDone) => {
    let expectDirection = 0;
    const observe = browserScroll.observeDirectionLooseX().subscribe(state => {
      expectDirection = state.directionX;
    });
    browserScroll.setDirectionLooseGapX(20);
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollTop: 0, scrollHeight: 200, innerHeight: 100 });
    spyScroll(mocks, { scrollLeft: 0, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(0);
    spyScroll(mocks, { scrollLeft: 10, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(0);
    spyScroll(mocks, { scrollLeft: 30, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollLeft: 20, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(1);
    spyScroll(mocks, { scrollLeft: 0, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(-1);
    spyScroll(mocks, { scrollLeft: 20, scrollWidth: 200, innerWidth: 100 });
    expect(expectDirection).toBe(1);
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

  it('observeEndX', (testDone) => {
    let expectCalled = false;
    const observe = browserScroll.observeEndX().subscribe(state => {
      expectCalled = true;
    });
    listener.add(observe);
    const mocks = spyCreate(browserScroll);
    spyScroll(mocks, { scrollLeft: 10, scrollWidth: 200, innerWidth: 100 });
    expect(expectCalled).toBe(false);
    spyScroll(mocks, { scrollLeft: 99, scrollWidth: 200, innerWidth: 100 });
    expect(expectCalled).toBe(false);
    spyScroll(mocks, { scrollLeft: 100, scrollWidth: 200, innerWidth: 100 });
    expect(expectCalled).toBe(true);
    testDone();
  });
});