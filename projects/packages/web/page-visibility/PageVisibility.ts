import { Subject, fromEvent, Subscription } from 'rxjs';
import { VisibilityState } from './types';

/**
 * Page Visibility
 * @export
 * @class PageVisibility
 */
export class PageVisibility {
  protected subjectState: Subject<VisibilityState>;
  protected eventListener: Subscription;
  protected hiddenProp: string;
  protected hiddenEventName: string;

  constructor() {
    this.eventListener = new Subscription();
    this.subjectState = new Subject();
  }

  init() {
    this.initCompatibility();
    const visibilityObserver = fromEvent(document, this.hiddenEventName);
    this.eventListener.add(visibilityObserver.subscribe(this.onVisibilityChange.bind(this)));
  }

  protected initCompatibility() {
    /* istanbul ignore else */
    if ('hidden' in document) {
      this.hiddenProp = 'hidden';
      this.hiddenEventName = 'visibilitychange';
    } else if ('msHidden' in document) {
      this.hiddenProp = 'msHidden';
      this.hiddenEventName = 'msvisibilitychange';
    } else if ('webkitHidden' in document) {
      this.hiddenProp = 'webkitHidden';
      this.hiddenEventName = 'webkitvisibilitychange';
    }
  }

  protected onVisibilityChange() {
    this.subjectState.next(this.getState());
  }

  isHidden(): boolean {
    return !!document[this.hiddenProp];
  }

  observeState() {
    return this.subjectState.asObservable();
  }

  getState() {
    const hidden = this.isHidden();
    return {
      hidden,
    };
  }

  destroy() {
    if (this.eventListener) {
      this.eventListener.unsubscribe();
    }
  }
}
