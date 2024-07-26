import type { OrderHistory } from '@/types';
import { authSessionStorage, orderHistorySessionStorage } from '@/utils/storage/index';

describe('authSessionStorage', () => {
  const testAuthToken = 'testAuthToken';

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('문자열 값을 저장하면, 저장된 값은 동일해야 한다.', () => {
    // given
    const value = testAuthToken;

    // when
    authSessionStorage.set(value);

    // then
    expect(authSessionStorage.get()).toBe(value);
  });

  it('undefined 값이 저장되면, 저장된 값은 null이어야 한다.', () => {
    // given
    const value = undefined;

    // when
    authSessionStorage.set(value);

    // then
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

  it('OrderHistory 객체를 저장하면, 저장된 값은 동일해야 한다.', () => {
    // given
    const value = testOrderHistory;

    // when
    orderHistorySessionStorage.set(value);

    // then
    expect(orderHistorySessionStorage.get()).toEqual(value);
  });

  it('undefined 값이 저장되면, 저장된 값은 null이어야 한다.', () => {
    // given
    const value = undefined;

    // when
    orderHistorySessionStorage.set(value);

    // then
    expect(orderHistorySessionStorage.get()).toBeNull();
  });
});
