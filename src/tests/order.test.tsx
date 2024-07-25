import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { queryClient } from '@/api/instance';
import { validateOrderForm } from '@/components/features/Order/OrderForm';
import { OrderPage } from '@/pages/Order';
import type { OrderFormData } from '@/types';
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
  const user = userEvent.setup();

  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);
  const cashReceiptTypeSelect = screen.getByTestId<HTMLInputElement>('cashReceiptType');
  const cashReceiptNumberInput =
    screen.getByPlaceholderText<HTMLInputElement>('(-없이) 숫자만 입력해주세요.');

  expect(cashReceiptCheckbox).toBeInTheDocument();
  expect(cashReceiptNumberInput).toBeInTheDocument();
  expect(cashReceiptTypeSelect).toBeInTheDocument();

  expect(cashReceiptTypeSelect).toBeDisabled();
  expect(cashReceiptNumberInput).toBeDisabled();

  await user.click(cashReceiptCheckbox);

  expect(cashReceiptCheckbox).toBeChecked();

  expect(cashReceiptTypeSelect).toBeEnabled();
  expect(cashReceiptNumberInput).toBeEnabled();

  fireEvent.change(cashReceiptTypeSelect, { target: { value: 'PERSONAL' } });
  fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

  expect(cashReceiptTypeSelect.value).toBe('PERSONAL');
  expect(cashReceiptNumberInput.value).toBe('1234567890');
});

describe('밸리데이션 검증', () => {
  it('현금영수증을 요청할 경우 번호를 입력해주세요.', () => {
    const orderData: OrderFormData = {
      productId: 1,
      productQuantity: 1,
      messageCardTextMessage: '감사합니다!',
      senderId: 123,
      receiverId: 456,
      hasCashReceipt: true,
      cashReceiptNumber: '',
    };
    const result = validateOrderForm(orderData);

    expect(result.isValid).toBe(false);

    expect(result.errorMessage).toBe('현금영수증 번호를 입력해주세요.');
  });

  it('현금영수증 번호는 숫자만 입력해주세요.', () => {
    const orderData: OrderFormData = {
      ...baseOrderData,
      hasCashReceipt: true,
      cashReceiptNumber: 'abc123',
    };
    const result = validateOrderForm(orderData);

    expect(result.isValid).toBe(false);

    expect(result.errorMessage).toBe('현금영수증 번호는 숫자로만 입력해주세요.');
  });

  it('메시지를 입력해주세요.', () => {
    const orderData: OrderFormData = {
      ...baseOrderData,
      messageCardTextMessage: '',
    };
    const result = validateOrderForm(orderData);

    expect(result.isValid).toBe(false);

    expect(result.errorMessage).toBe('메시지를 입력해주세요.');
  });

  it('메시지는 100자 이내로 입력해주세요.', () => {
    const orderData: OrderFormData = {
      ...baseOrderData,
      messageCardTextMessage: 'ㅋ'.repeat(101),
    };
    const result = validateOrderForm(orderData);

    expect(result.isValid).toBe(false);

    expect(result.errorMessage).toBe('메시지는 100자 이내로 입력해주세요.');
  });

  it('통과해야 하는 테스트', () => {
    const orderData: OrderFormData = {
      productId: 1,
      productQuantity: 2,
      messageCardTextMessage: '정상 데이터',
      senderId: 200,
      receiverId: 300,
      hasCashReceipt: true,
      cashReceiptNumber: '1234567890',
    };
    const result = validateOrderForm(orderData);

    expect(result.isValid).toBe(true);

    expect(result.errorMessage).toBeUndefined();
  });
});

const baseOrderData = {
  productId: 1,
  productQuantity: 2,
  messageCardTextMessage: '감사합니다!',
  senderId: 100,
  receiverId: 200,
  hasCashReceipt: false,
  cashReceiptNumber: '123456',
};
