import { BrowserScroll } from './BrowserScroll';
import { fromEvent } from 'rxjs';

type TargetElement = HTMLElement;

export class DomScroll extends BrowserScroll {
  protected element: TargetElement;

  /**
   * 초기화
   */
  init(): void {
    if (!this.element) {
      throw new Error('require setElement');
    }
    this.initScroll();
  }

  protected initScroll() {
    this.handleScroll = this.onScroll.bind(this);
    this.scrollObserver = fromEvent(this.element, 'scroll');
    this.eventListener.add(this.scrollObserver.subscribe(this.handleScroll));
  }

  setElement(element: TargetElement) {
    this.element = element;
  }

  get scrollTop(): number {
    return this.element.scrollTop;
  }

  get scrollLeft(): number {
    return this.element.scrollLeft;
  }

  get scrollHeight(): number {
    return this.element.scrollHeight;
  }

  get scrollWidth(): number {
    return this.element.scrollWidth;
  }

  get innerHeight(): number {
    return this.element.offsetHeight;
  }

  get innerWidth(): number {
    return this.element.offsetWidth;
  }
}
