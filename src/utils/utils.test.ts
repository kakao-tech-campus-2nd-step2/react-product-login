import {
  expect, it, describe,
} from 'vitest';
import { isNumericString } from '@utils/index';
import { replacePathParams } from '@utils/network';

describe('Util function test', () => {
  it('The string `asdfasdf` should not be numeric', () => {
    const str = 'asdfasdf';
    expect(isNumericString(str)).toBe(false);
  });
  it('The path /product/:productId should be replaced as `/product/1`', () => {
    const path = '/product/:productId';
    expect(replacePathParams(path, {
      productId: '1',
    }));
  });
});
