/**
 * ttl 캐시 값
 * @export
 * @class CacheValue
 * @template T
 */
export class CacheValue<T = any> {
  private _key: string;
  private _value: T;
  private _expireAt: number;
  private _expireNotfyTimer: any;
  /**
   * 캐시 값
   * @readonly
   */
  get value() {
    return this._value;
  }
  /**
   * 캐시 시간
   * @readonly
   */
  get expireAt() {
    return this._expireAt;
  }
  /**
   * 캐시 키 지정
   * @param {string} key
   */
  setKey(key: string) {
    this._key = key;
  }
  /**
   * 캐시 값 지정
   * @param {T} value
   */
  setValue(value: T) {
    this._value = value;
  }
  /**
   * 캐시 시간 지정
   * @param {number} at
   */
  setExpireAt(at: number) {
    this._expireAt = at;
  }
  /**
   * 지정된 expire 시간 만큼 대기 후 fnCallback 을 트리거
   * @param {number} expire
   * @param {Function} fnCallback
   */
  setExpireNotify(expire: number, fnCallback: Function) {
    clearTimeout(this._expireNotfyTimer);
    this._expireNotfyTimer = setTimeout(() => {
      fnCallback(this._key);
    }, expire + 1);
  }
  /**
   * 파기
   */
  destroy() {
    clearTimeout(this._expireNotfyTimer);
  }
}
