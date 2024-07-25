import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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

const testOrderHistory = {
  id: 3245119,
  count: 3,
};

const setup = async () => {
  orderHistorySessionStorage.set(testOrderHistory);
  renderWithProviders(<OrderPage />);
  const user = userEvent.setup();
  const submitButton = screen.getByText(/결제하기/i);
  return { user, submitButton };
};

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
  orderHistorySessionStorage.set(testOrderHistory);

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

test('메시지를 입력해주세요.', async () => {
  const { user, submitButton } = await setup();

  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
});

test('메시지는 100자 이내로 입력해주세요.', async () => {
  const { user, submitButton } = await setup();
  const messageTextArea =
    screen.getByPlaceholderText<HTMLTextAreaElement>('선물과 함께 보낼 메시지를 적어보세요');

  await user.type(messageTextArea, 'ㅋ'.repeat(101));
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
});

test('현금영수증을 요청할 경우 번호를 입력해주세요.', async () => {
  const { user, submitButton } = await setup();
  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);

  await user.click(cashReceiptCheckbox);
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
});

test('현금영수증 번호는 숫자만 입력해주세요.', async () => {
  const { user, submitButton } = await setup();
  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);
  const cashReceiptNumberInput =
    screen.getByPlaceholderText<HTMLInputElement>('(-없이) 숫자만 입력해주세요.');

  await user.click(cashReceiptCheckbox);
  await user.type(cashReceiptNumberInput, '1-2-3-4');
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
});

test('통과해야 하는 테스트', async () => {
  const { user, submitButton } = await setup();
  const messageTextArea =
    screen.getByPlaceholderText<HTMLTextAreaElement>('선물과 함께 보낼 메시지를 적어보세요');
  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);
  const cashReceiptNumberInput =
    screen.getByPlaceholderText<HTMLInputElement>('(-없이) 숫자만 입력해주세요.');

  await user.type(messageTextArea, '감사합니다!');
  await user.click(cashReceiptCheckbox);
  await user.type(cashReceiptNumberInput, '123456789');
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
});
