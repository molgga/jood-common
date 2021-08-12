import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StorageCastObserver, StorageCastEvent, CastConfig, DispatchType } from './types';

export class StorageCast {
  protected _window: Window;
  protected _init: boolean;
  protected _subject: Subject<StorageCastEvent>;
  protected _configStorageKey: string;
  protected _configRemoveDispatched: boolean;
  protected _onStorage: any;
  readonly storageEventName = 'storage';

  get window() {
    return this._window || window;
  }

  get document() {
    return this.window.document;
  }

  get localStorage() {
    return this.window.localStorage;
  }

  bindWindow(win: Window) {
    this._window = win;
  }

  init(config: CastConfig) {
    if (this._init) return;
    const { storageKey, removeDispatched = true } = config;
    this._configStorageKey = storageKey;
    this._configRemoveDispatched = removeDispatched;
    this._subject = new Subject();
    this._init = true;
    this._onStorage = this.onStorage.bind(this);
    this.window.addEventListener(this.storageEventName, this._onStorage);
  }

  destroy() {
    this.window.removeEventListener(this.storageEventName, this._onStorage);
    this._window = undefined;
    this._subject.unsubscribe();
    this._subject = undefined;
  }

  private onStorage(evt: StorageEvent) {
    const { key, newValue } = evt;
    const focus = this.document.hasFocus();
    const visibility = this.document.visibilityState;
    const isFocusOut = !focus || visibility === 'hidden';
    const isSameKey = key === this._configStorageKey;
    if (isFocusOut && isSameKey && newValue) {
      const value = JSON.parse(newValue);
      const { dispatchType, data: dispatchValue } = value;
      this._subject.next({
        key,
        event: evt,
        dispatchType,
        dispatchValue,
      });
    }
  }

  dispatch(type: DispatchType, serializableData?: any) {
    const value = JSON.stringify({ type, data: serializableData, stamp: Date.now() });
    this.localStorage.setItem(this._configStorageKey, value);
    if (this._configRemoveDispatched) {
      this.localStorage.removeItem(this._configStorageKey);
    }
  }

  observe<T = any>(dispatchType: DispatchType, observer: StorageCastObserver<T>): Subscription {
    return this._subject.pipe(filter((evt) => evt.dispatchType === dispatchType)).subscribe(observer);
  }

  observeAny<T = any>(observer: StorageCastObserver<T>): Subscription {
    return this._subject.subscribe(observer);
  }
}
