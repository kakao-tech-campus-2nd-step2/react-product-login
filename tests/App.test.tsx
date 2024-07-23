import { render, screen } from '@testing-library/react';
import React from 'react';

import type { Props } from '@/components/features/Home/CategorySection/CategoryItem';
import { CategoryItem } from '@/components/features/Home/CategorySection/CategoryItem';
import { Sum } from '@/Sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(Sum(1, 2)).toBe(3);
  });
});

describe('useGetCategorys 카테고리 렌더링 테스트', () => {
  const testProps: Props = {
    image: '',
    label: '라벨',
  };
  test('카테고리섹션이 렌더링 되는지', () => {
    render(<CategoryItem {...testProps} />);
    expect(screen.getByText(testProps.label)).toBeInTheDocument();
  });
});
