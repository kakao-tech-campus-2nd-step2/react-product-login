import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import * as authHooks from '@/provider/Auth';

import { GoodsDetailPage } from './index';

jest.mock('@/provider/Auth');

// window.confirm 모킹
beforeAll(() => {
  window.confirm = jest.fn();
});

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:productId" element={ui} />
          <Route path="/order" element={<div>Order Page</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('GoodsDetailPage', () => {
  beforeEach(() => {
    const useAuthMock = jest.spyOn(authHooks, 'useAuth');
    useAuthMock.mockReturnValue(undefined);
  });

  it('페이지 로드 시 상품 상세 정보와 옵션을 불러와야 합니다.', async () => {
    // Given: GoodsDetailPage 렌더링
    renderWithProviders(<GoodsDetailPage />);

    // Then: 로딩 인디케이터가 표시되는지 확인
    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();

    // Then: 상품 상세 정보와 옵션이 로드되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
  });

  it('옵션이 선택되었을 때 총 가격을 올바르게 계산해야 합니다.', async () => {
    // Given: GoodsDetailPage 렌더링
    renderWithProviders(<GoodsDetailPage />);

    // When: 상품 상세 정보가 로드되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // When: 수량 입력 값을 변경
    const input = screen.getByLabelText('수량');
    fireEvent.change(input, { target: { value: '2' } });

    // Then: 총 결제 금액이 올바르게 계산되었는지 확인
    await waitFor(() => {
      const totalAmountElement = document.querySelector('.css-9l982o');
      expect(totalAmountElement).not.toBeNull();
      if (totalAmountElement) {
        expect(totalAmountElement.textContent).toContain('총 결제 금액');
        expect(totalAmountElement.textContent).toContain('2000원');
      }
    });
  });

  it('인증되지 않은 상태에서 주문을 시도하면 로그인 프롬프트를 표시해야 합니다.', async () => {
    // Given: GoodsDetailPage 렌더링
    renderWithProviders(<GoodsDetailPage />);

    // When: 상품 상세 정보가 로드되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // When: "나에게 선물하기" 버튼 클릭
    const orderButton = screen.getByText('나에게 선물하기');
    fireEvent.click(orderButton);

    // Then: 로그인 확인 메시지가 표시되는지 확인
    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
    });
  });
});
