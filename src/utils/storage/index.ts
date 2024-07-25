import type { OrderHistory } from '@/types';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] | null => {
    const value = storage.getItem(storageKey);
    if (!value) return null;
    try {
      return JSON.parse(value) as StorageKey[T];
    } catch (e) {
      console.error(`Error parsing storage key "${storageKey}":`, e);
      return null;
    }
  };

  const set = (value: StorageKey[T]) => {
    if (value == undefined || value == null) {
      return storage.removeItem(storageKey);
    } else {
      const stringifiedValue = JSON.stringify(value);
      storage.setItem(storageKey, stringifiedValue);
    }
  };

  return { get, set };
};

export const authSessionStorage = initStorage('authToken', sessionStorage);
export const orderHistorySessionStorage = initStorage('orderHistory', sessionStorage);

interface StorageKey {
  authToken?: string;
  orderHistory?: OrderHistory;
}

export { initStorage };
