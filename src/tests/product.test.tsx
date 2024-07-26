import '@testing-library/jest-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { queryClient } from '@/api/instance';
import { GoodsDetailPage } from '@/pages/Goods/Detail';

import { worker } from '../../server';

beforeAll(() => worker.listen());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());

const renderWithProviders = (ui: ReactElement, { route = '/' } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/products/:productId" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

test('Test on request success', async () => {
  renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119' });

  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  expect(
    screen.getByText(/\[단독각인\] 피렌체 1221 에디션 오드코롱 50ml \(13종 택1\)/i),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!/),
  ).toBeInTheDocument();
});

test('Is ErrorBoundary working', async () => {
  renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119zz' });

  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  expect(screen.getByText('에러 페이지')).toBeInTheDocument();
});

test('Counting buttons', async () => {
  const user = userEvent.setup();
  renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119' });

  const incrementButton = screen.getByLabelText('수량 1개 추가');
  const decrementButton = screen.getByLabelText('수량 1개 감소');
  const totalPrice = screen.getByText('총 결제 금액');

  expect(totalPrice).toHaveTextContent('145000');

  await user.click(incrementButton);

  expect(totalPrice).toHaveTextContent('290000');

  await user.click(decrementButton);

  expect(totalPrice).toHaveTextContent('145000');
});
