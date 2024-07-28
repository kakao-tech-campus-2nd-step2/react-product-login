// src/utils/storage/index.tsx
import type { OrderHistory } from '@/types';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);
    return value ? JSON.parse(value) : null;
  };

  const set = (value: StorageKey[T]) => {
    if (value === undefined || value === null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);
    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const authSessionStorage = initStorage('authInfo', sessionStorage);
export const orderHistorySessionStorage = initStorage('orderHistory', sessionStorage);
export const userSessionStorage = initStorage('user', sessionStorage);

interface StorageKey {
  authInfo?: { email: string; token: string };
  orderHistory?: OrderHistory;
  user? :{email: string; password: string};
}
