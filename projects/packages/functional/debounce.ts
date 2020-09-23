type Func<T extends any[]> = (...args: T) => void;

export function debounce<T extends any[]>(func: Func<T>, timemout: number): Func<T> {
  let timer: any;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timemout);
  };
}
