// 렌더링 확인(단위 테스트)
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { CategoryHeroSection } from '@/components/features/Category/CategoryHeroSection';
import * as useCurrentCategoryHook from '@/hooks/useCurrentCategory';
import type { CategoryData } from '@/types';

jest.mock('@/hooks/useCurrentCategory');

describe('CategoryHeroSection Component', () => {
  it('renders the category details correctly', () => {
    const mockCurrentTheme: CategoryData = {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets and devices.',
      color: '#FFFFFF',
      imageUrl: 'image-url.jpg',
    };

    const mockUseCurrentCategory = jest.spyOn(useCurrentCategoryHook, 'useCurrentCategory').mockReturnValue({
      isRender: true,
      currentTheme: mockCurrentTheme,
    });

    render(<CategoryHeroSection categoryId='1' />);

    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Latest gadgets and devices.')).toBeInTheDocument();

    mockUseCurrentCategory.mockRestore();
  });

  it('does not render when isRender is false', () => {
    const mockUseCurrentCategory = jest.spyOn(useCurrentCategoryHook, 'useCurrentCategory').mockReturnValue({
      isRender: false,
      currentTheme: undefined,
    });

    const { container } = render(<CategoryHeroSection categoryId='1' />);
    expect(container).toBeEmptyDOMElement();

    mockUseCurrentCategory.mockRestore();
  });
});