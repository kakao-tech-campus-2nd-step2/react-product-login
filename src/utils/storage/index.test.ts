import type { OrderHistory } from '@/types';
import { authSessionStorage, orderHistorySessionStorage } from '@/utils/storage/index';

describe('authSessionStorage', () => {
  const testAuthToken = 'testAuthToken';

  beforeEach(() => {
    sessionStorage.clear();
  });

  test('문자열 값 저장 및 저장된 값 얻기', () => {
    authSessionStorage.set(testAuthToken);
    expect(authSessionStorage.get()).toBe(testAuthToken);
  });

  test('undefined 값에 대한 처리 확인', () => {
    authSessionStorage.set(undefined);
    expect(authSessionStorage.get()).toBeNull();
  });
});

describe('orderHistorySessionStorage', () => {
  const testOrderHistory: OrderHistory = {
    id: 0,
    count: 0,
  };

  beforeEach(() => {
    sessionStorage.clear();
  });

  test('객체 값 저장 및 저장된 값 얻기', () => {
    orderHistorySessionStorage.set(testOrderHistory);
    expect(orderHistorySessionStorage.get()).toEqual(testOrderHistory);
  });

  test('undefined 값에 대한 처리 확인', () => {
    orderHistorySessionStorage.set(undefined);
    expect(orderHistorySessionStorage.get()).toBeNull();
  });
});
