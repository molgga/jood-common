export interface CastConfig {
  storageKey: string;
  removeDispatched?: boolean;
}

export interface StorageCastEvent<T = any> {
  event: StorageEvent;
  key: string;
  dispatchType: DispatchType;
  dispatchValue: T;
}

export type DispatchType = string;

export type StorageCastObserver<T> = (evt: StorageCastEvent<T>) => void;
