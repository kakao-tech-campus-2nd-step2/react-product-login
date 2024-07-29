import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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

test('현금영수증 신청 하지 않았을 때, 현금영수증 번호 및 종류 필드 비활성화 되는지. ', async () => {
  orderHistorySessionStorage.set(testOrderHistory);
  renderWithProviders(<OrderPage />);
  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  const cashReceiptTypeSelect = screen.getByTestId<HTMLInputElement>('cashReceiptType');
  const cashReceiptNumberInput =
    screen.getByPlaceholderText<HTMLInputElement>('(-없이) 숫자만 입력해주세요.');

  expect(cashReceiptTypeSelect).toBeDisabled();
  expect(cashReceiptNumberInput).toBeDisabled();
});

test('현금 영수증을 신청했을 때, 현금영수증 번호 및 종류 선택 필드 활성화 되는지.', async () => {
  renderWithProviders(<OrderPage />);
  const user = userEvent.setup();

  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);
  const cashReceiptTypeSelect = screen.getByTestId<HTMLInputElement>('cashReceiptType');
  const cashReceiptNumberInput =
    screen.getByPlaceholderText<HTMLInputElement>('(-없이) 숫자만 입력해주세요.');

  await user.click(cashReceiptCheckbox);

  expect(cashReceiptCheckbox).toBeChecked();

  expect(cashReceiptTypeSelect).toBeEnabled();
  expect(cashReceiptNumberInput).toBeEnabled();
});

test('현금 영수증을 신청했을 때, 현금영수증 번호 및 종류 선택 필드 사용자 입력값 잘 받는지.', async () => {
  renderWithProviders(<OrderPage />);
  const user = userEvent.setup();

  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);
  const cashReceiptTypeSelect = screen.getByTestId<HTMLInputElement>('cashReceiptType');
  const cashReceiptNumberInput =
    screen.getByPlaceholderText<HTMLInputElement>('(-없이) 숫자만 입력해주세요.');

  await user.click(cashReceiptCheckbox);
  await user.selectOptions(cashReceiptTypeSelect, 'PERSONAL');
  await user.type(cashReceiptNumberInput, '1234567890');

  expect(cashReceiptTypeSelect.value).toBe('PERSONAL');
  expect(cashReceiptNumberInput.value).toBe('1234567890');
});

test('메세지 카드가 비워져있을 때, 입력해달라는 문구 알러트 잘 뜨는지.', async () => {
  const { user, submitButton } = await setup();

  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
});

test('메세지 카드의 문단이 100 글자가 넘었을 때, 줄여달라는 문구 알러트로 잘 뜨는지.', async () => {
  const { user, submitButton } = await setup();
  const messageTextArea =
    screen.getByPlaceholderText<HTMLTextAreaElement>('선물과 함께 보낼 메시지를 적어보세요');

  await user.type(messageTextArea, 'ㅋ'.repeat(101));
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
});

test('현금영수증을 요청했을 때, 입력값이 없는 경우, 현금영수증 번호를 입력해 달라는 문구 알러트로 잘 뜨는지.', async () => {
  const { user, submitButton } = await setup();
  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);

  await user.click(cashReceiptCheckbox);
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
});

test('현금영수증을 요청했을 때, 숫자가 아닌 입력값이 있는 경우, 현금영수증 번호는 숫자만 입력해 달라는 문구가 잘 뜨는지.', async () => {
  const { user, submitButton } = await setup();
  const cashReceiptCheckbox = screen.getByLabelText<HTMLInputElement>(/현금영수증 신청/i);
  const cashReceiptNumberInput =
    screen.getByPlaceholderText<HTMLInputElement>('(-없이) 숫자만 입력해주세요.');

  await user.click(cashReceiptCheckbox);
  await user.type(cashReceiptNumberInput, '1-2-3-4');
  await user.click(submitButton);

  expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
});

test('메세지 카드, 현금 영수증 신청, 현금영수증 번호 입력값 모두 적절해 요청을 보냈을 때, 응답이 오면 주문 완료 문구 알러트 잘 뜨는지.', async () => {
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
