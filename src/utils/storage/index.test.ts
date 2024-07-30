import type { OrderHistory } from '@/types';

import { initStorage } from './index';

describe('initStorage', () => {
  let mockSessionStorage: jest.Mocked<Storage>;

  beforeEach(() => {
    mockSessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    };
  });

  describe('Given a value to store and retrieve', () => {
    it('should store and retrieve a value', () => {
      // Given
      const storage = initStorage('authToken', mockSessionStorage);

      // When
      storage.set('my-auth-token');
      mockSessionStorage.getItem.mockReturnValueOnce(JSON.stringify('my-auth-token'));

      // Then
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'authToken',
        JSON.stringify('my-auth-token'),
      );
      const value = storage.get();
      expect(value).toBe('my-auth-token');
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('Given a value to remove', () => {
    it('should remove a value when set to undefined or null', () => {
      // Given
      const storage = initStorage('authToken', mockSessionStorage);

      // When
      storage.set(null as unknown as string);

      // Then
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('authToken');

      // When
      storage.set(undefined as unknown as string);

      // Then
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('Given a non-JSON value in storage', () => {
    it('should handle non-JSON values gracefully', () => {
      // Given
      mockSessionStorage.getItem.mockReturnValueOnce('not-a-json');
      const storage = initStorage('authToken', mockSessionStorage);

      // When
      const value = storage.get();

      // Then
      expect(value).toBeNull();
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('authToken');
    });
  });

  describe('Given a complex object to store and retrieve', () => {
    it('should store and retrieve a complex object', () => {
      // Given
      const orderHistory: OrderHistory = { id: 123, count: 1 };
      const storage = initStorage('orderHistory', mockSessionStorage);

      // When
      storage.set(orderHistory);
      mockSessionStorage.getItem.mockReturnValueOnce(JSON.stringify(orderHistory));

      // Then
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'orderHistory',
        JSON.stringify(orderHistory),
      );
      const value = storage.get();
      expect(value).toEqual(orderHistory);
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('orderHistory');
    });
  });
});
