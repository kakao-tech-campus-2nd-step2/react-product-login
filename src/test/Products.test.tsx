import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { serverWorker } from '@/mocks/server';
import { ProductsPage } from '@/pages/Products';

const queryClient = new QueryClient();

beforeAll(() => serverWorker.listen());
afterEach(() => serverWorker.resetHandlers());
afterAll(() => serverWorker.close());

const renderWithProviders = (ui: ReactElement, { route = '/' } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/products/:productsId" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

test('Product Page', async () => {
  renderWithProviders(<ProductsPage />, { route: '/products/3245119' });

  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  expect(
    screen.getByText(/\[단독각인\] 피렌체 1221 에디션 오드코롱 50ml \(13종 택1\)/i),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!/),
  ).toBeInTheDocument();
});
