import { CacheValue } from './CacheValue';
import { Serializable } from './types';

/**
 * ttl 캐시
 * @export
 * @class TTLCache
 * @example
 *  const ttlCache = new TTLCache();
 * ttlCache.set("A", "myValue1", 0);
 * ttlCache.set("B", "myValue2", 100);
 * ttlCache.set("C", "myValue3", 200);
 * ttlCache.expired("unknown-k1"); // true;
 * ttlCache.expired("unknown-k2"); // true;
 * ttlCache.expired("A"); // true;
 * ttlCache.expired("B"); // false;
 * ttlCache.expired("C")); // false;
 * ttlCache.get("unknown-k1"); // undefined
 * ttlCache.get("unknown-k2"); // undefined
 * ttlCache.get("A"); // undefined
 * ttlCache.get("B"); // "myValue2"
 * ttlCache.get("C"); // "myValue3"
 * ttlCache.toJson(); // { B: "myValue2", C: "myValue3" }
 * // await delay(101);
 * ttlCache.expired("unknown-k1"); // true
 * ttlCache.expired("unknown-k2"); // true
 * ttlCache.expired("A"); // true
 * ttlCache.expired("B"); // true
 * ttlCache.expired("C"); // false
 * ttlCache.get("unknown-k1"); // undefined
 * ttlCache.get("unknown-k2"); // undefined
 * ttlCache.get("A"); // undefined
 * ttlCache.get("B"); // undefined
 * ttlCache.get("C"); // "myValue3"
 * ttlCache.toJson(); // { C: "myValue3" }
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
   * 맵의 value
   * @protected
   * @param {string} key
   * @returns {CacheValue}
   */
  protected getCache(key: string): CacheValue {
    return this.cacheMap.get(key);
  }

  /**
   * key 가 존재하는 경우 값이 expire 되었는지 여부 확인.
   * key 가 존재하지 않는 경우 true.
   * @param {string} key
   */
  expired(key: string): boolean {
    if (this.cacheMap.has(key)) {
      const now = this.now();
      const cacheValue = this.getCache(key);
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
   * CacheValue 에 등록된 expire 시간(정도) 후 CacheValue 로 부터 호출을 기대하는 콜백
   * @param {string} key
   */
  expireNotify(key: string) {
    if (this.expired(key)) {
      this.remove(key);
    }
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
        return this.getCache(key).value;
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
    const existCache = this.getCache(key);
    if (existCache) {
      existCache.destroy();
    }
    cacheValue.setKey(key);
    cacheValue.setValue(value);
    cacheValue.setExpireAt(now + +expire);
    cacheValue.setExpireNotify(expire, this.expireNotify.bind(this));
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
    const cacheValue = this.getCache(key);
    if (cacheValue) {
      cacheValue.destroy();
    }
    this.cacheMap.delete(key);
  }

  /**
   * key 배열 반환
   * @returns {string[]}
   */
  getKeys(): string[] {
    return Array.from(this.cacheMap.keys());
  }

  /**
   * expire 된것 삭제
   */
  flushExpired() {
    this.getKeys().forEach((key) => {
      if (this.expired(key)) {
        this.remove(key);
      }
    });
  }

  /**
   * 비우기
   */
  flushAll() {
    this.getKeys().forEach((key) => {
      this.remove(key);
    });
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

  /**
   * 파기
   */
  destroy() {
    this.flushAll();
  }
}
