import '@testing-library/jest-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route, { state }]}>
          <Routes>
            <Route path="/" element={ui} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

const messages = {
  success: '주문이 완료되었습니다.',
  noMessage: '메세지를 입력해주세요.',
  noReceiptNumber: '현금영수증 번호를 입력해주세요.',
};

test('Order Page', async () => {
  window.alert = jest.fn();

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

  const submitButton = screen.getByRole('submit');
  fireEvent.click(needReceiptInput);

  fireEvent.change(messageInput, { target: { value: '안녕하세요' } });
  fireEvent.click(submitButton);
  await waitFor(() => expect(window.alert).toBeCalledWith(messages.success));

  fireEvent.change(messageInput, { target: { value: '' } });
  fireEvent.click(submitButton);
  await waitFor(() => expect(window.alert).toBeCalledWith(messages.noMessage));

  fireEvent.change(messageInput, { target: { value: '안녕하세요' } });
  fireEvent.click(needReceiptInput);
  fireEvent.click(submitButton);
  await waitFor(() => expect(window.alert).toBeCalledWith(messages.noReceiptNumber));

  fireEvent.change(receiptNumberInput, { target: { value: '1234567890' } });
  fireEvent.click(submitButton);
  await waitFor(() => expect(window.alert).toBeCalledWith(messages.success));
});
