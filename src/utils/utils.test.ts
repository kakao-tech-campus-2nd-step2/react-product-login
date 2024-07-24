import { expect, test } from 'vitest';
import { isNumericString } from '@utils/index';

test('asdfasdf는 numeric string이 아니어야 합니다.', () => {
  const str = 'asdfasdf';
  expect(isNumericString(str)).toBe(false);
});
