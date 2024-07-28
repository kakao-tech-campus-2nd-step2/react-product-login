import { render } from '@testing-library/react';

import { PRODUCT_OPTIONS_MOCK } from '@/api/hooks/product-options.mock';
import { GoodsDetailPage } from '@/pages/Goods/Detail';

const PRODUCT_DETAIL_MOCK = {
  id: '3245119',
  name: 'Mock Product',
  description: 'This is a mock product.',
  price: 1000,
  imageUrl: 'mock-image-url',
};

jest.mock('@/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn().mockImplementation(() => ({
    data: PRODUCT_DETAIL_MOCK,
  })),
}));

jest.mock('@/api/hooks/useGetProductOptions', () => ({
  useGetProductOptions: jest.fn().mockImplementation(() => ({
    data: PRODUCT_OPTIONS_MOCK,
  })),
}));

describe('GoodsDetailPage', () => {
  test('ProductDetail과 ProductOptions 올바르게 렌더링', async () => {
    render(<GoodsDetailPage />);
  });
});
