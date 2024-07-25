import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import * as authHooks from '@/provider/Auth';

import { GoodsDetailPage } from './index';

jest.mock('@/provider/Auth');

// Mocking window.confirm
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

  it('should load product detail and options on page load', async () => {
    renderWithProviders(<GoodsDetailPage />);

    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
  });

  it('should calculate total price correctly when option is selected', async () => {
    renderWithProviders(<GoodsDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const input = screen.getByLabelText('수량');
    fireEvent.change(input, { target: { value: '2' } });

    await waitFor(() => {
      screen.debug(); // 렌더링된 DOM 출력

      const totalAmountElement = document.querySelector('.css-9l982o');
      expect(totalAmountElement).not.toBeNull();
      if (totalAmountElement) {
        expect(totalAmountElement.textContent).toContain('총 결제 금액');
        expect(totalAmountElement.textContent).toContain('2000원');
      }
    });
  });

  it('should prompt login when not authenticated and trying to order', async () => {
    renderWithProviders(<GoodsDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    const orderButton = screen.getByText('나에게 선물하기');
    fireEvent.click(orderButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
    });
  });
});
