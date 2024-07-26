import type { OrderHistory, WishList } from '@/types';

interface AuthToken {
  id: string;
  pwd: string;
}

interface StorageKey {
  authToken?: AuthToken;
  orderHistory?: OrderHistory;
  wishList?: WishList;
}

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    return JSON.parse(value as string);
  };
  const set = (value: StorageKey[T]) => {
    if (value == undefined || value == null) {
      return storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);

    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const authSessionStorage = initStorage('authToken', sessionStorage);
export const orderHistorySessionStorage = initStorage('orderHistory', sessionStorage);
export const wishListSessionStorage = initStorage('wishList', sessionStorage);
