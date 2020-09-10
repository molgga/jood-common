import { ICookie, ICookieSet } from './types';

/**
 * 브라우져(document) 쿠키
 * @class BrowserCookie
 * @implements {ICookie}
 */
export class BrowserCookie implements ICookie {
  /**
   * 쿠키에 넣을 값 encode
   * @param {string} value
   * @returns {string}
   */
  encode(value: string): string {
    return encodeURIComponent(value);
  }

  /**
   * 쿠키에 꺼내는 값 decode
   * @param {string} value
   * @returns {string}
   */
  decode(value: string): string {
    return decodeURIComponent(value);
  }

  /**
   * document 쿠키 값 반환
   * @returns {string}
   */
  getCookies(): string {
    return document.cookie;
  }

  /**
   * document 에 쿠키 값 지정
   * @param {(string | any)} cookie
   */
  setCookies(cookie: string | any) {
    document.cookie = cookie;
  }

  /**
   * 쿠키 중 name 에 해당하는 값이 있는지 여부
   * @param {string} name
   * @returns {boolean}
   */
  has(name: string): boolean {
    if (typeof document === 'undefined') return false;
    name = this.encode(name);
    const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
    return regexp.test(this.getCookies());
  }

  /**
   * 쿠키 중 name 에 해당하는 값 반환
   * @param {string} name
   * @returns {string}
   */
  get(name: string): string {
    if (this.has(name)) {
      name = this.encode(name);
      const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
      const result = regexp.exec(this.getCookies());
      return this.decode(result[1]);
    } else {
      return;
    }
  }

  /**
   * 모든 쿠키값을 key&value 로 반환
   * @returns {{ [key: string]: string }}
   */
  getAll(): { [key: string]: string } {
    const all: any = {};
    const cookies: string = this.getCookies();
    if (cookies && cookies != '') {
      const split = cookies.split(';');
      for (const str of split) {
        const cookieItem = str.split('=');
        cookieItem[0] = cookieItem[0].replace(/^ /, '');
        all[this.decode(cookieItem[0])] = this.decode(cookieItem[1]);
      }
    }
    return all;
  }

  /**
   * 쿠키에 값 넣기
   * @param {ICookieSet} options
   * @returns {void}
   */
  set(options: ICookieSet): void {
    if (!options || !options.name || options.value === undefined) return;
    const { name, value, expires = 0, path = '/', domain = '', secure = false } = options;
    const maker = [];
    maker.push(`${this.encode(name)}=${this.encode(value)};`);
    if (expires) {
      if (typeof expires === 'number') {
        const dtExpires = new Date(new Date().getTime() + expires * 1000);
        maker.push(`expires=${dtExpires.toUTCString()};`);
      } else {
        maker.push(`expires=${expires.toUTCString()};`);
      }
    }

    maker.push(`path=${path};`);
    if (domain) maker.push(`domain=${domain};`);
    if (secure) maker.push(`secure=${secure};`);
    this.setCookies(maker.join(''));
  }

  /**
   * 쿠키 중 일치하는 값 제거
   * @param {string} name
   * @param {string} [path]
   * @param {string} [domain]
   */
  delete(name: string, path?: string, domain?: string): void {
    this.set({
      name,
      value: '',
      path,
      domain,
      expires: -1,
    });
  }

  /**
   * 일치하는 모든 쿠키 제거
   * @param {string} [path]
   * @param {string} [domain]
   */
  deleteAll(path?: string, domain?: string): void {
    const cookies: any = this.getAll();
    for (const cookieName of Object.keys(cookies)) {
      this.delete(cookieName, path, domain);
    }
  }
}
