import {
  expect, it, describe,
} from 'vitest';
import { isNumericString } from '@utils/index';

describe('Numeric string test', () => {
  it('asdfasdf는 numeric string이 아니어야 합니다.', () => {
    const str = 'asdfasdf';
    expect(isNumericString(str)).toBe(false);
  });
});
