import {
  expect, it, describe,
} from 'vitest';
import { isNumericString } from '@utils/index';

describe('Util function test', () => {
  it('The string `asdfasdf` should not be numeric', () => {
    const str = 'asdfasdf';
    expect(isNumericString(str)).toBe(false);
  });
});
