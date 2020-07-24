type Serializable = any;

class CacheValue<T = any> {
  private _value: T;
  private _expireAt: number;
  get value() {
    return this._value;
  }
  get expireAt() {
    return this._expireAt;
  }
  setValue(value: T) {
    this._value = value;
  }
  setExpireAt(at: number) {
    this._expireAt = at;
  }
}

/**
 * ttl 캐시
 * @export
 * @class TTLCache
 */
export class TTLCache {
  protected cacheMap: Map<string, CacheValue> = new Map();

  protected now(): number {
    return Date.now();
  }

  /**
   * 보유 맵
   * @readonly
   * @type {Map<string, CacheValue>}
   */
  get map(): Map<string, CacheValue> {
    return this.cacheMap;
  }

  /**
   * key 가 존재하는 경우 값이 expire 되었는지 여부 확인.
   * key 가 존재하지 않는 경우 true.
   * @param {string} key
   */
  expired(key: string): boolean {
    if (this.cacheMap.has(key)) {
      const now = this.now();
      const cacheValue = this.cacheMap.get(key);
      const expireAt = cacheValue.expireAt;
      if (expireAt < now) {
        this.remove(key);
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  /**
   * key 에 해당하는 값 반환
   * @template T
   * @param {string} key
   */
  get<T>(key: string): T {
    if (this.has(key)) {
      if (this.expired(key)) {
        return;
      } else {
        return this.cacheMap.get(key).value;
      }
    }
    return;
  }

  /**
   * key 에 value 를 expire(millisecond) 만큼 저장
   * @template T
   * @param {string} key
   * @param {T} value
   * @param {number} expire
   */
  set<T>(key: string, value: T, expire: number): void {
    if (!expire) return;
    const now = this.now();
    const cacheValue = new CacheValue<T>();
    cacheValue.setValue(value);
    cacheValue.setExpireAt(now + +expire);
    this.cacheMap.set(key, cacheValue);
  }

  /**
   * key 가 존재하는지 여부
   * @param {string} key
   */
  has(key: string): boolean {
    return !this.expired(key) ? this.cacheMap.has(key) : false;
  }

  /**
   * key 삭제
   * @param {string} key
   */
  remove(key: string): void {
    this.cacheMap.delete(key);
  }

  /**
   * 보유하고 있는 key&value 를 모두 반환
   */
  toJson() {
    const keys = Array.from(this.cacheMap.keys());
    const hash: { [key: string]: Serializable } = {};
    keys.map((key) => {
      if (!this.expired(key)) {
        hash[key.toString()] = this.get(key);
      }
    });
    return hash;
  }
}
