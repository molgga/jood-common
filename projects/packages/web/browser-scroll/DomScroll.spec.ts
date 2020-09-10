import { Subscription } from 'rxjs';
import { DomScroll } from "./DomScroll";

describe('DomScroll', () => {
  const listener: Subscription = new Subscription();
  let element = document.createElement('div');
  let domScroll: DomScroll;

  beforeEach(() => {
    domScroll = new DomScroll();
    domScroll.setElement(element);
    domScroll.init();
  });

  afterEach(() => {
    domScroll.destroy();
    domScroll = null;
  });

  afterAll(() => {
    listener.unsubscribe();
  });

  it('require element',  () => {
    const domScroll = new DomScroll();
    expect(() => {
      domScroll.init();
    }).toThrow();
  });

  it('prop test',  () => {
    expect(domScroll.scrollTop).toBe(0);
    expect(domScroll.scrollLeft).toBe(0);
    expect(domScroll.scrollHeight).toBe(0);
    expect(domScroll.scrollWidth).toBe(0);
    expect(domScroll.innerHeight).toBe(0);
    expect(domScroll.innerWidth).toBe(0);
  });
});