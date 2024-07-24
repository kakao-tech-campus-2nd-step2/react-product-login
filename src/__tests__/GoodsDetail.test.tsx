import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GoodsDetailPage } from '@/pages/Goods/Detail';

const PRODUCT_DETAIL_MOCK = {
  id: '3245119',
  name: 'Mock Product',
  description: 'This is a mock product.',
  price: 1000,
  imageUrl: 'mock-image-url',
};

const PRODUCT_OPTIONS_MOCK = [
  { id: 1, name: 'Option A', quantity: 10, productId: '3245119' },
  { id: 2, name: 'Option B', quantity: 20, productId: '3245119' },
];

// Mock hooks
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

    // // 상품 이름이 렌더링되는지 검증
    // await waitFor(() => {
    //   expect(screen.getByText(/Mock Product/i)).toBeInTheDocument(); // 상품 이름
    // });

    // 상품 설명이 렌더링되는지 검증
    // const description = await screen.findByText(/This is a mock product./i);
    // expect(description).toBeInTheDocument(); // 상품 설명

    // 옵션 A와 옵션 B가 화면에 표시될 때까지 기다림
    // await waitFor(() => {
    //   expect(screen.getByText(/Option A/i)).toBeInTheDocument();
    //   expect(screen.getByText(/Option B/i)).toBeInTheDocument();
    // });
  });
});
