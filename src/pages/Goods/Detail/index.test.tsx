import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { GoodsDetailPage } from '@/pages/Goods/Detail';
import { useAuth } from '@/provider/Auth';

jest.mock('@/provider/Auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('@/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn(),
}));
jest.mock('@/api/hooks/useGetProductOptions', () => ({
  useGetProductOptions: jest.fn(),
}));

describe('GoodsDetailPage', () => {
  const productId = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    (useGetProductDetail as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useGetProductOptions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useAuth as jest.Mock).mockReturnValue(null);
  });

  test('상품 상세 페이지가 제대로 렌더링 되는지 확인', async () => {
    render(
      <MemoryRouter initialEntries={[`/goods/${productId}`]}>
        <Routes>
          <Route path="/goods/:productId" element={<GoodsDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading-view')).toBeInTheDocument();

    (useGetProductDetail as jest.Mock).mockReturnValueOnce({
      data: { price: 1000 },
      isLoading: false,
    });
    (useGetProductOptions as jest.Mock).mockReturnValueOnce({
      data: [{ name: 'Option 1' }],
      isLoading: false,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-view')).not.toBeInTheDocument();

      expect(screen.getByText('Mocked GoodsDetail')).toBeInTheDocument();
      expect(screen.getByText('Mocked OptionSection')).toBeInTheDocument();
    });
  });

  test('상품 상세 페이지에서 에러가 발생했을 때 에러 페이지가 렌더링 되는지 확인', async () => {
    (useGetProductDetail as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to fetch product detail');
    });

    render(
      <MemoryRouter initialEntries={[`/goods/${productId}`]}>
        <Routes>
          <Route path="/goods/:productId" element={<GoodsDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('에러 페이지')).toBeInTheDocument();
    });
  });
});