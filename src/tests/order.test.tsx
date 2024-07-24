import '@testing-library/jest-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { queryClient } from '@/api/instance';
import { OrderPage } from '@/pages/Order';
import { orderHistorySessionStorage } from '@/utils/storage';

import { worker } from '../../server';

beforeAll(() => {
  worker.listen();
  window.alert = jest.fn();
});
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());

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
    </ChakraProvider>,
  );
};

test('오더테스트', async () => {
  orderHistorySessionStorage.set({
    id: 3245119,
    count: 3,
  });

  renderWithProviders(<OrderPage />);

  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  const cashReceiptCheckbox = screen.getByLabelText(/현금영수증 신청/i);
  const cashReceiptTypeSelect = screen.getByTestId('cashReceiptType');
  const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

  expect(cashReceiptCheckbox).toBeInTheDocument();
  expect(cashReceiptNumberInput).toBeInTheDocument();
  expect(cashReceiptTypeSelect).toBeInTheDocument();

  expect(cashReceiptTypeSelect).toBeDisabled();
  expect(cashReceiptNumberInput).toBeDisabled();

  fireEvent(screen.getByLabelText(/현금영수증 신청/i), new MouseEvent('click', { bubbles: true }));
  cashReceiptCheckbox.checked = true;
  cashReceiptTypeSelect.disabled = false;
  cashReceiptNumberInput.disabled = false;

  expect(cashReceiptCheckbox).toBeChecked();
  expect(cashReceiptTypeSelect).toBeEnabled();
  expect(cashReceiptNumberInput).toBeEnabled();

  fireEvent.change(cashReceiptTypeSelect, { target: { value: 'PERSONAL' } });
  fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

  expect(cashReceiptTypeSelect.value).toBe('PERSONAL');
  expect(cashReceiptNumberInput.value).toBe('1234567890');
});
