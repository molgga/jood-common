import { Observable, Subject } from 'rxjs';

interface Config {
  start: number;
  end: number;
  friction?: number;
  delay?: number;
}

export function decelerate(config: Config): Observable<number> {
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
