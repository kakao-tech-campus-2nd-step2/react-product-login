import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { serverWorker } from '@/mocks/server';
import { OrderPage } from '@/pages/Order';

const queryClient = new QueryClient();

beforeAll(() => serverWorker.listen());
afterEach(() => serverWorker.resetHandlers());
afterAll(() => serverWorker.close());

const renderWithProviders = (ui: ReactElement, { route = '/', state = {} } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route, { state }]}>
        <Routes>
          <Route path="/" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

test('Order Page', async () => {
  renderWithProviders(<OrderPage />, {
    route: '/order',
    state: {
      id: 1,
      name: '피렌체 1221 에디션 오드코롱 50ml',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0012/2182/9279/products/1221_50ml_1_800x.jpg?v=1632932167',
      price: 100000,
      count: 1,
    },
  });

  const messageInput = screen.getByRole('message');
  const needReceiptInput = screen.getByRole('needReceipt');
  const receiptTypeInput = screen.getByRole('receiptType');
  const receiptNumberInput = screen.getByRole('receiptNumber');

  expect(needReceiptInput).not.toBeChecked();
  expect(receiptTypeInput).toBeDisabled();
  expect(receiptNumberInput).toBeDisabled();

  fireEvent.click(needReceiptInput);
  expect(receiptTypeInput).toBeEnabled();
  expect(receiptNumberInput).toBeEnabled();
});
