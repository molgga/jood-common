import { fromEvent, Subscription, Observable, Subject } from 'rxjs';
import { IScrollState, ScrollDirection } from './types';

/**
 * 브라우져(window) 스크롤
 * @export
 * @class BrowserScroll
 */
export class BrowserScroll {
  protected handleScroll: () => void;
  protected handleResize: () => void;
  protected resizeEventName = 'resize';
  protected scrollEventName = 'scroll';
  protected resizeObserver: Observable<Event>;
  protected scrollObserver: Observable<Event>;
  protected scrollSubject: Subject<IScrollState>;
  protected eventListener: Subscription;

  protected currentY = 0;
  protected yDirection = 0;
  protected yDirectionLooseBefore = 0;
  protected yDirectionLooseGap = 20;
  protected yDirectionSubject: Subject<IScrollState>;
  protected yDirectionLooseSubject: Subject<IScrollState>;

  protected yEndDispatchHold = false;
  protected yEndSubject: Subject<IScrollState>;

  protected yHalfEndDispatchHold = false;
  protected yHalfEndSubject: Subject<IScrollState>;

  /**
   * 초기화
   */
  init(): void {
    this.scrollSubject = new Subject();
    this.yDirectionSubject = new Subject();
    this.yDirectionLooseSubject = new Subject();
    this.yEndSubject = new Subject();
    this.yHalfEndSubject = new Subject();
    this.eventListener = new Subscription();

    this.handleScroll = this.onScroll.bind(this);
    this.handleResize = this.onResize.bind(this);
    this.resizeObserver = fromEvent(window, this.resizeEventName);
    this.scrollObserver = fromEvent(window, this.scrollEventName);
    this.eventListener.add(this.scrollObserver.subscribe(this.handleScroll));
    this.eventListener.add(this.resizeObserver.subscribe(this.handleResize));
  }

  /**
   * 옵저버블: 스크롤이 발생하면 알림
   * @returns {Observable<IScrollState>}
   */
  observeScroll(): Observable<IScrollState> {
    return this.scrollSubject.asObservable();
  }

  /**
   * 옵저버블: 스크롤의 방향이 바뀌면 알림
   * @returns {Observable<IScrollState>}
   */
  observeDirectionY(): Observable<IScrollState> {
    return this.yDirectionSubject.asObservable();
  }

  /**
   * 옵저버블: 스크롤의 방향이 바뀌고, 일정 조건에 도달시 발생하는 알림
   * @returns {Observable<IScrollState>}
   */
  observeDirectionLooseY(): Observable<IScrollState> {
    return this.yDirectionLooseSubject.asObservable();
  }

  /**
   * 옵저버블: 스크롤이 맨 아래에 도달할 때 알림
   * @returns {Observable<IScrollState>}
   */
  observeEndY(): Observable<IScrollState> {
    return this.yEndSubject.asObservable();
  }

  /**
   * 옵저버블: 스크롤이 맨 아래에서 화면의 반을 뺀 위치에 도달할 때 알림
   * @returns {Observable<IScrollState>}
   */
  observeHalfEndY(): Observable<IScrollState> {
    return this.yHalfEndSubject.asObservable();
  }

  /**
   * 트리거: observeScroll() 의 구독자들에게 알림
   */
  dispatchScroll(): void {
    this.scrollSubject.next(this.getState());
  }

  /**
   * 트리거: observeDirectionY() 의 구독자들에게 알림
   */
  dispatchDirectionY(): void {
    this.yDirectionSubject.next(this.getState());
  }

  /**
   * 트리거: observeDirectionLooseY() 의 구독자들에게 알림
   */
  dispatchDirectionLooseY(): void {
    this.yDirectionLooseSubject.next(this.getState());
  }

  /**
   * 트리거: observeEndY() 의 구독자들에게 알림
   */
  dispatchEndY(): void {
    this.yEndSubject.next(this.getState());
  }

  /**
   * 트리거: observeHalfEndY() 의 구독자들에게 알림
   */
  dispatchHalfEndY(): void {
    this.yHalfEndSubject.next(this.getState());
  }

  /**
   * 스크롤이 end 위치 보다 커지면 observeEndY() 으로 알림이 전달되는데,
   * 연속해서 알림이 전달 되는것을 막기 위해 hold 상태로 제어를 하는데,
   * 강제로 hold 상태를 제어해야 하는 경우에만 사용.
   * @param {boolean} is
   */
  holdDispatchEndY(is: boolean): void {
    this.yEndDispatchHold = is;
  }

  /**
   * 스크롤이 end - 화면 높이반 위치 보다 커지면 observeHalfEndY() 으로 알림이 전달되는데,
   * 연속해서 알림이 전달 되는것을 막기 위해 hold 상태로 제어를 하는데,
   * 강제로 hold 상태를 제어해야 하는 경우에만 사용.
   * @param {boolean} is
   */
  holdDispatchHalfEndY(is: boolean): void {
    this.yHalfEndDispatchHold = is;
  }

  /**
   * observeDirectionLooseY() 의 옵션.
   * 스크롤 방향 변경에 대한 알림 조건 중,
   * 이전 스크롤 위치와 현재 스크롤 위치의 여백 차이를 비교하는데, 그 차이값을 지정.
   * @param {number} gap
   */
  setDirectionLooseGapY(gap: number): void {
    this.yDirectionLooseGap = gap;
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

  get scrollTop(): number {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  get scrollHeight(): number {
    return document.documentElement.scrollHeight || document.body.scrollHeight;
  }

  get innerHeight(): number {
    return window.innerHeight;
  }

  protected onResize(): void {
    this.onScroll();
  }

  /**
   * 핸들러: 스크롤
   * @protected
   */
  protected onScroll(): void {
    const currentY = this.currentY;
    const { scrollTop, endHeight, halfEndHeight, directionY } = this.getState();

    let yDirection = 0;
    if (currentY < scrollTop) {
      yDirection = ScrollDirection.DOWN;
    } else if (scrollTop < currentY) {
      yDirection = ScrollDirection.UP;
    }

    this.yDirection = yDirection;
    this.currentY = scrollTop;
    this.dispatchScroll();

    if (this.yDirection !== directionY) {
      this.dispatchDirectionY();
    }

    if (this.yDirectionLooseBefore !== this.yDirection) {
      if (this.yDirectionLooseGap <= Math.abs(scrollTop - currentY)) {
        this.dispatchDirectionLooseY();
        this.yDirectionLooseBefore = this.yDirection;
      }
    }

    if (endHeight <= scrollTop) {
      if (!this.yEndDispatchHold) {
        this.dispatchEndY();
      }
      this.holdDispatchEndY(true);
    } else {
      this.holdDispatchEndY(false);
    }

    if (halfEndHeight <= scrollTop) {
      if (!this.yHalfEndDispatchHold) {
        this.dispatchHalfEndY();
      }
      this.holdDispatchHalfEndY(true);
    } else {
      this.holdDispatchHalfEndY(false);
    }
  }

  /**
   * 구독자에게 전달되는 데이터
   * @returns {IScrollState}
   */
  getState(): IScrollState {
    const scrollTop = this.scrollTop;
    const scrollHeight = this.scrollHeight;
    const innerHeight = this.innerHeight;
    const endHeight = scrollHeight - innerHeight;
    const halfHeight = innerHeight / 2;
    const halfEndHeight = endHeight - halfHeight;
    const directionY = this.yDirection;
    const holdEndY = this.yEndDispatchHold;
    const holdHalfY = this.yEndDispatchHold;
    const percentY = scrollTop / endHeight;
    return {
      scrollTop,
      scrollHeight,
      innerHeight,
      endHeight,
      directionY,
      halfHeight,
      halfEndHeight: halfEndHeight < 0 ? 0 : halfEndHeight,
      holdEndY,
      holdHalfY,
      percentY: isNaN(percentY) ? 0 : percentY,
    };
  }

  /**
   * 파기
   */
  destroy(): void {
    if (this.eventListener) {
      this.eventListener.unsubscribe();
      this.eventListener = null;
    }

    if (this.scrollSubject) {
      this.scrollSubject.unsubscribe();
      this.scrollSubject = null;
    }

    if (this.yDirectionLooseSubject) {
      this.yDirectionLooseSubject.unsubscribe();
      this.yDirectionLooseSubject = null;
    }

    if (this.yEndSubject) {
      this.yEndSubject.unsubscribe();
      this.yEndSubject = null;
    }

    if (this.yHalfEndSubject) {
      this.yHalfEndSubject.unsubscribe();
      this.yHalfEndSubject = null;
    }
  }
}
