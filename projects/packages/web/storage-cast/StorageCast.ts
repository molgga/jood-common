import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StorageCastObserver, StorageCastEvent, CastConfig, EventType } from './types';

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
    if (!focus && key === this._configStorageKey && newValue) {
      const value = JSON.parse(newValue);
      const { type, data } = value;
      this._subject.next({
        type,
        value: data,
        event: evt,
      });
    }
  }

  dispatch(type: EventType, serializableData?: any) {
    const value = JSON.stringify({ type, data: serializableData, stamp: Date.now() });
    this.localStorage.setItem(this._configStorageKey, value);
    if (this._configRemoveDispatched) {
      this.localStorage.removeItem(this._configStorageKey);
    }
  }

  observe<T = any>(type: EventType, observer: StorageCastObserver<T>): Subscription {
    return this._subject.pipe(filter((evt) => evt.type === type)).subscribe(observer);
  }
}
