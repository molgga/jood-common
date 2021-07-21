import { fromEvent, Subscription, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBrowserScroll, IScrollState, ScrollDirection, ScrollType } from './types';

/**
 * 브라우져(window) 스크롤
 * @export
 * @class BrowserScroll
 */
export class BrowserScroll implements IBrowserScroll {
  protected handleScroll: () => void;
  protected handleResize: () => void;
  protected resizeObserver: Observable<Event>;
  protected scrollObserver: Observable<Event>;
  protected eventListener: Subscription;
  protected subjectScroll: Subject<ScrollType>;
  protected observableScroll: Observable<ScrollType>;
  protected yCurrent = 0;
  protected yDirection = 0;
  protected yDirectionLooseBefore = 0;
  protected yDirectionLooseGap = 20;
  protected yEndDispatchHold = false;
  protected xCurrent = 0;
  protected xDirection = 0;
  protected xDirectionLooseBefore = 0;
  protected xDirectionLooseGap = 20;
  protected xEndDispatchHold = false;

  constructor() {
    this.eventListener = new Subscription();
    this.subjectScroll = new Subject();
    this.observableScroll = this.subjectScroll.asObservable();
  }

  /**
   * 초기화
   */
  init(): void {
    this.initScroll();
    this.initResize();
  }

  protected initScroll() {
    this.handleScroll = this.onScroll.bind(this);
    this.scrollObserver = fromEvent(window, 'scroll');
    this.eventListener.add(this.scrollObserver.subscribe(this.handleScroll));
  }

  protected initResize() {
    this.handleResize = this.onResize.bind(this);
    this.resizeObserver = fromEvent(window, 'resize');
    this.eventListener.add(this.resizeObserver.subscribe(this.handleResize));
  }

  get scrollTop(): number {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  get scrollLeft(): number {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }

  get scrollHeight(): number {
    return document.documentElement.scrollHeight || document.body.scrollHeight;
  }

  get scrollWidth(): number {
    return document.documentElement.scrollWidth || document.body.scrollWidth;
  }

  get innerHeight(): number {
    return window.innerHeight;
  }

  get innerWidth(): number {
    return window.innerWidth;
  }

  /**
   * 구독자에게 전달되는 데이터
   * @returns {IScrollState}
   */
  getState(): IScrollState {
    const scrollTop = this.scrollTop;
    const scrollHeight = this.scrollHeight;
    const innerHeight = this.innerHeight;
    const directionY = this.yDirection;
    const holdEndY = this.yEndDispatchHold;
    const endY = scrollHeight - innerHeight;
    let percentY = scrollTop / endY;
    percentY = isNaN(percentY) ? 0 : percentY;

    const scrollLeft = this.scrollLeft;
    const scrollWidth = this.scrollWidth;
    const innerWidth = this.innerWidth;
    const directionX = this.xDirection;
    const holdEndX = this.xEndDispatchHold;
    const endX = scrollWidth - innerWidth;
    let percentX = scrollLeft / endX;
    percentX = isNaN(percentX) ? 0 : percentX;

    return {
      scrollTop,
      scrollHeight,
      innerHeight,
      directionY,
      holdEndY,
      percentY,
      endY,
      scrollLeft,
      scrollWidth,
      innerWidth,
      directionX,
      holdEndX,
      percentX,
      endX,
    };
  }

  /**
   * 스크롤 loose Y 방향 변경에 대한 알림 조건 중, 이전 스크롤 위치와 현재 스크롤 위치의 여백 차이값
   * @param {number} gap
   */
  setDirectionLooseGapY(gap: number): void {
    this.yDirectionLooseGap = gap;
  }

  /**
   * 스크롤 loose X 방향 변경에 대한 알림 조건 중, 이전 스크롤 위치와 현재 스크롤 위치의 여백 차이값
   * @param {number} gap
   */
  setDirectionLooseGapX(gap: number): void {
    this.xDirectionLooseGap = gap;
  }

  /**
   * 지정한 위치로 스크롤
   * @param {number} top
   * @param {number} [left=0]
   */
  setScroll(top: number, left: number = 0): void {
    window.scroll(left, top);
  }

  /**
   * 지정한 위치로 스크롤 + 애니메이션
   * @param {number} top
   * @param {number} [left=0]
   * @param {boolean} [behavior=true] 'smooth'
   */
  setScrollTo(top: number, left: number = 0, behavior: boolean = true): void {
    window.scrollTo({ top, left, behavior: behavior ? 'smooth' : 'auto' });
  }

  /**
   * 스크롤 y 끝에 도달할 때 알림을 일시 보류한다.
   * @param {boolean} is
   */
  holdDispatchEndY(is: boolean): void {
    this.yEndDispatchHold = is;
  }

  /**
   * 스크롤 x 끝에 도달할 때 알림을 일시 보류한다.
   * @param {boolean} is
   */
  holdDispatchEndX(is: boolean): void {
    this.xEndDispatchHold = is;
  }

  /**
   * 트리거: observeScroll() 의 구독자들에게 알림
   */
  dispatchScroll(type: ScrollType): void {
    this.subjectScroll.next(type);
  }

  protected pipeScroll(observable: Observable<ScrollType>, filterType: ScrollType) {
    return observable.pipe(
      filter((type) => type === filterType),
      map(() => this.getState())
    );
  }

  /**
   * 옵저버블: 스크롤이 발생하면 알림
   * @returns {Observable<IScrollState>}
   */
  observeScroll(): Observable<IScrollState> {
    return this.pipeScroll(this.observableScroll, ScrollType.SCROLL);
  }

  /**
   * 옵저버블: 스크롤의 Y 방향이 바뀌면 알림
   * @returns {Observable<IScrollState>}
   */
  observeDirectionY(): Observable<IScrollState> {
    return this.pipeScroll(this.observableScroll, ScrollType.DIRECTION_Y);
  }

  /**
   * 옵저버블: 스크롤의 Y 방향이 바뀌고, 일정 조건에 도달시 발생하는 알림
   * @returns {Observable<IScrollState>}
   */
  observeDirectionLooseY(): Observable<IScrollState> {
    return this.pipeScroll(this.observableScroll, ScrollType.DIRECTION_LOOSE_Y);
  }

  /**
   * 옵저버블: 스크롤이 Y 끝에 도달할 때 알림
   * @returns {Observable<IScrollState>}
   */
  observeEndY(): Observable<IScrollState> {
    return this.pipeScroll(this.observableScroll, ScrollType.END_Y);
  }

  /**
   * 옵저버블: 스크롤의 X 방향이 바뀌면 알림
   * @returns {Observable<IScrollState>}
   */
  observeDirectionX(): Observable<IScrollState> {
    return this.pipeScroll(this.observableScroll, ScrollType.DIRECTION_X);
  }

  /**
   * 옵저버블: 스크롤의 X 방향이 바뀌고, 일정 조건에 도달시 발생하는 알림
   * @returns {Observable<IScrollState>}
   */
  observeDirectionLooseX(): Observable<IScrollState> {
    return this.pipeScroll(this.observableScroll, ScrollType.DIRECTION_LOOSE_X);
  }

  /**
   * 옵저버블: 스크롤이 X 끝에 도달할 때 알림
   * @returns {Observable<IScrollState>}
   */
  observeEndX(): Observable<IScrollState> {
    return this.pipeScroll(this.observableScroll, ScrollType.END_X);
  }

  /**
   * 핸들러: 리사이즈
   * @protected
   */
  protected onResize(): void {
    this.onScroll();
  }

  /**
   * 핸들러: 스크롤
   * @protected
   */
  protected onScroll(): void {
    this.onScrollX();
    this.onScrollY();
    this.dispatchScroll(ScrollType.SCROLL);
  }

  /**
   * 스크롤 X 축
   * @protected
   */
  protected onScrollX() {
    const { scrollLeft, endX, directionX } = this.getState();
    const xCurrent = this.xCurrent;
    let xDirection = 0;
    if (xCurrent < scrollLeft) {
      xDirection = ScrollDirection.RIGHT;
    } else if (scrollLeft < xCurrent) {
      xDirection = ScrollDirection.LEFT;
    } else {
      xDirection = ScrollDirection.NONE;
    }
    this.xDirection = xDirection;
    this.xCurrent = scrollLeft;
    if (this.xDirection !== directionX) {
      this.dispatchScroll(ScrollType.DIRECTION_X);
    }
    if (this.xDirectionLooseBefore !== this.xDirection && this.xDirectionLooseGap <= Math.abs(scrollLeft - xCurrent)) {
      this.dispatchScroll(ScrollType.DIRECTION_LOOSE_X);
      this.xDirectionLooseBefore = this.xDirection;
    }
    if (endX <= scrollLeft) {
      if (!this.xEndDispatchHold) {
        this.dispatchScroll(ScrollType.END_X);
      }
      this.holdDispatchEndX(true);
    } else {
      this.holdDispatchEndX(false);
    }
  }

  /**
   * 스크롤 Y 축
   * @protected
   */
  protected onScrollY() {
    const { scrollTop, endY, directionY } = this.getState();
    const yCurrent = this.yCurrent;
    let yDirection = 0;
    if (yCurrent < scrollTop) {
      yDirection = ScrollDirection.DOWN;
    } else if (scrollTop < yCurrent) {
      yDirection = ScrollDirection.UP;
    } else {
      yDirection = ScrollDirection.NONE;
    }
    this.yDirection = yDirection;
    this.yCurrent = scrollTop;
    if (this.yDirection !== directionY) {
      this.dispatchScroll(ScrollType.DIRECTION_Y);
    }
    if (this.yDirectionLooseBefore !== this.yDirection && this.yDirectionLooseGap <= Math.abs(scrollTop - yCurrent)) {
      this.dispatchScroll(ScrollType.DIRECTION_LOOSE_Y);
      this.yDirectionLooseBefore = this.yDirection;
    }
    if (endY <= scrollTop) {
      if (!this.yEndDispatchHold) {
        this.dispatchScroll(ScrollType.END_Y);
      }
      this.holdDispatchEndY(true);
    } else {
      this.holdDispatchEndY(false);
    }
  }

  /**
   * 파기
   */
  destroy(): void {
    if (this.eventListener) {
      this.eventListener.unsubscribe();
      this.eventListener = null;
    }
    if (this.subjectScroll) {
      this.subjectScroll.unsubscribe();
      this.subjectScroll = null;
    }
  }
}
