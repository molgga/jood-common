import { BrowserCookie } from './BrowserCookie';

function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), duration);
  });
}

describe('BrowserCookie', () => {
  let cookie: BrowserCookie;
  const TEST_COOKIES = [
    { name: 'a', value: '11' },
    { name: 'b', value: '22' },
    { name: 'c', value: '33' },
  ];
  
  beforeEach(() => {
    cookie = new BrowserCookie();
    TEST_COOKIES.forEach((cook: any) => {
      cookie.set(cook);
    })
  });

  afterEach(() => {
    cookie.deleteAll();
  });

  it('get', () => {
    expect(cookie.get('a')).toBe('11');
    expect(cookie.get('b')).toBe('22');
    expect(cookie.get('c')).toBe('33');
    expect(cookie.get('d')).toBe(undefined);
  });

  it('has', () => {
    expect(cookie.has('a')).toBe(true);
    expect(cookie.has('b')).toBe(true);
    expect(cookie.has('c')).toBe(true);
    expect(cookie.has('d')).toBe(false);
  });

  it('set', () => {
    expect(cookie.has('d')).toBe(false);
    expect(cookie.has('e')).toBe(false);
    cookie.set({ name: 'd', value: 'hello' });
    cookie.set({ name: 'e' } as any);
    expect(cookie.has('d')).toBe(true);
    expect(cookie.has('e')).toBe(false);
  });

  it('set domain, secure', () => {
    expect(cookie.has('d')).toBe(false);
    expect(cookie.has('e')).toBe(false);
    expect(cookie.has('f')).toBe(false);
    cookie.set({ name: 'd', value: 'foo', domain: 'localhost' });
    expect(cookie.has('d')).toBe(true);
    cookie.set({ name: 'e', value: 'bar', domain: 'unknown-domain-foo' });
    expect(cookie.has('e')).toBe(false);
    cookie.set({ name: 'f', value: 'bar', secure: true });
    expect(cookie.has('f')).toBe(true);
  });

  it('set expire', async () => {
    expect(cookie.has('d')).toBe(false);
    expect(cookie.has('e')).toBe(false);
    cookie.set({ name: 'd', value: 'bar', expires: new Date(Date.now() + 1000) });
    cookie.set({ name: 'e', value: 'bar', expires: 1 });
    expect(cookie.has('d')).toBe(true);
    expect(cookie.has('e')).toBe(true);
    await delay(1100);
    expect(cookie.has('d')).toBe(false);
    expect(cookie.has('e')).toBe(false);
  });

  it('delete', () => {
    expect(cookie.has('d')).toBe(false);
    cookie.set({ name: 'd', value: 'hello' });
    expect(cookie.has('d')).toBe(true);
    cookie.delete('d');
    expect(cookie.has('d')).toBe(false);
  });

  it('getAll', () => {
    const all = cookie.getAll();
    expect(all.a).toBe('11');
    expect(all.b).toBe('22');
    expect(all.c).toBe('33');
  });

  it('getCookies', () => {
    const expectString = TEST_COOKIES.map(cook => {
      return `${cook.name}=${cook.value}`
    }).join('; ');
    const cookieString = cookie.getCookies();
    expect(cookieString).toBe(expectString);
  });
});