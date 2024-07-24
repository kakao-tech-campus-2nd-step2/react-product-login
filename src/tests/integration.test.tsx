import '@testing-library/jest-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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
