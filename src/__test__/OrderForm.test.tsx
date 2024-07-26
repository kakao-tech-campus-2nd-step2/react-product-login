import { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { queryClient } from '@/api/config/queryClient';
import { OrderForm } from '@/pages/OrderPage/components/OrderForm';
import { OrderHistory } from '@/types/orderType';

const renderWithProviders = (ui: ReactElement, { route = '/' } = {}) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/" element={ui} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

const orderHistory: OrderHistory = {
  productId: '1',
  productQuantity: 1,
};

describe('OrderForm의 유효성 테스트', () => {
  test('렌더링 확인', async () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);

    const cashReceiptCheckbox = screen.getByRole('checkbox');
    expect(cashReceiptCheckbox).toBeInTheDocument();
  });
});
