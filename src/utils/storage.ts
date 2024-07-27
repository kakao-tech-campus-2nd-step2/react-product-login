import { LoginResponse } from '@/api/services/auth/login';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    return JSON.parse(value as string);
  };
  const set = (value: StorageKey[T]) => {
    if (value === undefined || value == null) {
      storage.removeItem(storageKey);
    }

    const stringifiedValue = JSON.stringify(value);
    storage.setItem(storageKey, stringifiedValue);
  };

  return { get, set };
};

export const authLocalStorage = initStorage('authInfo', localStorage);

interface StorageKey {
  authInfo?: LoginResponse;
}
