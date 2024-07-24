import type { OrderHistory } from '@/types';

import { authSessionStorage, orderHistorySessionStorage } from '../index';

describe('initStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe('authSessionStorage', () => {
    it('authToken을 저장하고 검색할 수 있다', () => {
      const testToken = 'testToken';
      authSessionStorage.set(testToken);

      expect(authSessionStorage.get()).toEqual(testToken);
    });

    it('undefined를 설정하면 항목을 제거한다', () => {
      authSessionStorage.set('testToken');
      authSessionStorage.set(undefined);

      expect(authSessionStorage.get()).toBeNull();
    });

    it('키가 존재하지 않으면 가져올 수 없다', () => {
      expect(authSessionStorage.get()).toBeNull();
    });
  });

  describe('orderHistorySessionStorage', () => {
    it('OrderHistory 타입의 데이터를 저장하고 검색할 수 있다', () => {
      const testOrderHistory: OrderHistory = {
        id: 1,
        count: 5,
      };
      orderHistorySessionStorage.set(testOrderHistory);
      expect(orderHistorySessionStorage.get()).toEqual(testOrderHistory);
    });

    it('OrderHistory의 count를 업데이트할 수 있다', () => {
      const initialOrderHistory: OrderHistory = { id: 1, count: 5 };
      orderHistorySessionStorage.set(initialOrderHistory);

      const updatedOrderHistory: OrderHistory = { ...initialOrderHistory, count: 7 };
      orderHistorySessionStorage.set(updatedOrderHistory);

      expect(orderHistorySessionStorage.get()).toEqual(updatedOrderHistory);
    });
  });
});
