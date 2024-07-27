import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import * as ProductHooks from '@/api/hooks/useGetProductDetail'; 

import { GoodsDetailHeader } from './Header'; 

jest.mock('@/api/hooks/useGetProductDetail');

describe('GoodsDetailHeader', () => {
  beforeEach(() => {
    const mockUseGetProductDetail = jest.fn().mockReturnValue({
      data: {
        imageUrl: 'test-image-url.jpg',
        name: 'Test Product',
        price: '1000',
      },
    });
    (ProductHooks.useGetProductDetail as jest.Mock) = mockUseGetProductDetail;
  });

  it('renders correctly with the product details', () => {
    render(<GoodsDetailHeader productId="123" />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('1000원')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-image-url.jpg');
  });

  it('displays the custom notice', () => {

    render(<GoodsDetailHeader productId="123" />);

    expect(screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!')).toBeInTheDocument();
  });
});
