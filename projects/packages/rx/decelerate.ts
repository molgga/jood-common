/**
 * @packageDocumentation
 * @module rx
 */
import { Observable, Subject } from 'rxjs';

/**
 * 감속 설정값
 * @interface
 * @property start {number} 시작 값
 * @property end {number} 도달하려는 값
 * @property friction {number} 0 < n <= 1 감속 마찰값(높을 수록 빠르게 도달)
 * @property delay {number} 감속 계산 사이 대기시간(ms)
 */
interface DecelerateConfig {
  start: number;
  end: number;
  friction?: number;
  delay?: number;
}

/**
 * start(시작값) 부터 end(도달값) 까지 friction(마찰값)에 영향을 받아 감속하며 도달
 * @export
 * @param {DecelerateConfig} config
 * @returns {Observable<number>}
 * @example
 *  decelerate({ start: 0, end: 100, friction: 0.1, delay: 0 }).subscribe(value => {
 *    console.log(value); // 0 ~ ...... ~ 100
 *  });
 */
export function decelerate(config: DecelerateConfig): Observable<number> {
  const { start: targetStart, end: targetEnd, friction = 0.1, delay = 0 } = config;
  if (friction <= 0) {
    throw new Error(`Friction can't be set below zero.`);
  }
  const subject = new Subject<number>();
  const observable = subject.asObservable();
  const finish = targetEnd - 0.01;
  const finishGap = 0.1;
  const targetFriction = Math.min(1, friction);
  const targetDelay = Math.max(0, delay);
  const isDeley = 0 < delay;
  let targetTick = targetStart;
  let requestTimer: any;

  function tick() {
    const isFinish = Math.abs(targetTick - finish) < finishGap;
    const value: number = isFinish ? targetEnd : targetTick;
    if (isFinish) {
      dispose();
    } else {
      nextTick();
    }
    dispatch(value);
    targetTick = targetTick + (targetEnd - targetTick) * targetFriction;
  }

  function nextTick() {
    if (isDeley) {
      requestTimer = setTimeout(tick, targetDelay);
    } else {
      requestTimer = requestAnimationFrame(tick);
    }
  }

  function dispatch(value: number) {
    subject.next(value);
  }

  function dispose() {
    if (isDeley) {
      clearTimeout(requestTimer);
    } else {
      cancelAnimationFrame(requestTimer);
    }
    requestTimer = null;
  }

  nextTick();

  return observable;
}
