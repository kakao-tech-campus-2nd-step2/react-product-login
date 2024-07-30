import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { GoodsDetailPage } from '@/pages/Goods/Detail';
import { useAuth } from '@/provider/Auth';

jest.mock('@/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn(),
}));

jest.mock('@/api/hooks/useGetProductOptions', () => ({
  useGetProductOptions: jest.fn(),
}));

jest.mock('@/provider/Auth', () => ({
  useAuth: jest.fn(),
}));

const mockProductDetail = { price: 1000 };
const mockProductOptions = [{ name: '옵션1' }];

describe('GoodsDetailPage', () => {
  beforeEach(() => {
    (useGetProductDetail as jest.Mock).mockReturnValue({
      data: mockProductDetail,
      isLoading: false,
      error: null,
    });
    (useGetProductOptions as jest.Mock).mockReturnValue({
      data: mockProductOptions,
      isLoading: false,
      error: null,
    });
    (useAuth as jest.Mock).mockReturnValue(null);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('렌더링 되는지 확인', async () => {
    render(
      <MemoryRouter initialEntries={['/goods/1']}>
        <Routes>
          <Route path="/goods/:productId" element={<GoodsDetailPage />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('총 결제 금액')).toBeInTheDocument();
    expect(screen.getByText('관심 등록')).toBeInTheDocument();
    expect(screen.getByText('나에게 선물하기')).toBeInTheDocument();

    fireEvent.click(screen.getByText('나에게 선물하기'));

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
    });
  });
});
