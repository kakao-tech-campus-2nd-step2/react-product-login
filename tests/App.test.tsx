import { Sum } from '@/Sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(Sum(1, 2)).toBe(3);
  });
});
