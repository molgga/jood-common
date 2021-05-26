export interface CastConfig {
  storageKey: string;
  removeDispatched?: boolean;
}

export interface StorageCastEvent<T = any> {
  type: EventType;
  value: T;
  event: StorageEvent;
}

export type EventType = string;

export type StorageCastObserver<T> = (evt: StorageCastEvent<T>) => void;
