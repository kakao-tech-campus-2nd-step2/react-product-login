// source: 7월 8일자 라이브 클론코딩 강의
import { OrderHistoryData } from '@/types';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    return JSON.parse(value as string);
  };
  const set = (value: StorageKey[T]) => {
    if (typeof value === 'undefined' || value === null) {
      storage.removeItem(storageKey);

      return;
    }

    const stringifiedValue = JSON.stringify(value);

    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

// eslint-disable-next-line import/prefer-default-export
export const orderHistoryStorage = initStorage('orderHistory', sessionStorage);

interface StorageKey {
  orderHistory?: OrderHistoryData;
}
