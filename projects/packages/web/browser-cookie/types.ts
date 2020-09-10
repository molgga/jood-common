/**
 */
export interface ICookieSet {
  name: string;
  value: string;
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

/**
 */
export interface ICookie {
  encode(value: string): string;
  decode(value: string): string;
  has(name: string): boolean;
  get(name: string): string;
  getAll(): any;
  set(options: ICookieSet): void;
  delete(name: string, path?: string, domain?: string): void;
  deleteAll(path?: string, domain?: string): void;
  getCookies(): string;
  setCookies(cookie: string): void;
}
