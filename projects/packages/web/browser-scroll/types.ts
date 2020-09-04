import { Observable } from 'rxjs';

export enum ScrollDirection {
  UP = -1,
  LEFT = -1,
  DOWN = 1,
  RIGHT = 1
}

export interface IBrowserScroll {
  init(): void;
  observeScroll(): Observable<IScrollState>;
  observeLooseDirectionY(): Observable<IScrollState>;
  observeEndY(): Observable<IScrollState>;
  observeHalfEndY(): Observable<IScrollState>;
  dispatchEndY(): void;
  dispatchScroll(): void;
  dispatchDirectionLooseY(): void;
  dispatchHalfEndY(): void;
  holdDispatchEndY(is: boolean): void;
  holdDispatchHalfEndY(is: boolean): void;
  setDirectionLooseGapY(gap: number): void;
  setScroll(top: number, left?: number): void;
  setScrollTo(top: number, left?: number, behavior?: boolean): void;
  getState(): IScrollState;
  readonly scrollTop: number;
  readonly scrollHeight: number;
  readonly innerHeight: number;
  destroy(): void;
}

export interface IScrollState {
  scrollTop: number;
  scrollHeight: number;
  innerHeight: number;
  endHeight: number;
  halfHeight: number;
  halfEndHeight: number;
  directionY: number;
  holdEndY: boolean;
  holdHalfY: boolean;
  percentY: number;
}
