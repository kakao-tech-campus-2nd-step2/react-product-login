import { LoginResponse } from '@/api/services/auth/login';

const initStorage = <T extends keyof StorageKey>(key: T, storage: Storage) => {
  const storageKey = `${key}`;

  const get = (): StorageKey[T] => {
    const value = storage.getItem(storageKey);

    return JSON.parse(value as string);
  };

  const set = (value: StorageKey[T]) => {
    const stringifiedValue = JSON.stringify(value);

    storage.setItem(storageKey, stringifiedValue);
  };

  const remove = () => {
    storage.removeItem(storageKey);
  };

  return { get, set, remove };
};

export const authLocalStorage = initStorage('authInfo', localStorage);

interface StorageKey {
  authInfo?: LoginResponse;
}
