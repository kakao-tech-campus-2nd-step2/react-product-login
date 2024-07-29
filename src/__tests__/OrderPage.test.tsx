import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { server } from '@/mocks/server';
import { OrderPage } from '@/pages/Order';
import { orderHistorySessionStorage } from '@/utils/storage';

const queryClient = new QueryClient();

beforeAll(() => {
  server.listen();
  window.alert = jest.fn();
});
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

const renderOrderPage = async () => {
  orderHistorySessionStorage.set({
    id: 3245119,
    count: 3,
  });

  render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<OrderPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );

  await waitFor(
    () => {
      expect(screen.queryByRole('spinner')).not.toBeInTheDocument();
    },
    { timeout: 5000 },
  );

  const elements = {
    checkbox: screen.getByTestId('needcheck'),
    cashReceiptType: screen.getByTestId('receipttype'),
    cashReceiptNumber: screen.getByTestId('inputnumber'),
    messageInput: screen.getByTestId('message'),
    saveButton: screen.getByTestId('savebutton'),
  };

  return elements;
};

const checkAlertMessage = async (action: () => void, expectedMessage: string) => {
  action();
  await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expectedMessage));
};

test('현금영수증 체크박스가 체크되지 않은 경우 필드가 비활성화 되어있는지 확인', async () => {
  const { checkbox, cashReceiptType, cashReceiptNumber } = await renderOrderPage();

  expect(checkbox).not.toBeChecked();
  expect(cashReceiptType).toBeDisabled();
  expect(cashReceiptNumber).toBeDisabled();

  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(cashReceiptType).toBeEnabled();
    expect(cashReceiptNumber).toBeEnabled();
  });
});

test('메시지 입력값 없이 제출 시 경고창이 뜨는지 확인', async () => {
  const { saveButton } = await renderOrderPage();
  await checkAlertMessage(() => fireEvent.click(saveButton), '메시지를 입력해주세요.');
});

test('현금영수증 번호 입력값 없이 제출 시 경고창이 뜨는지 확인', async () => {
  const { checkbox, messageInput, saveButton } = await renderOrderPage();
  fireEvent.change(messageInput, { target: { value: '테스트 메시지' } });
  fireEvent.click(checkbox);
  await checkAlertMessage(() => fireEvent.click(saveButton), '현금영수증 번호를 입력해주세요.');
});

test('현금영수증 번호에 잘못된 형식 입력 시 경고창이 뜨는지 확인', async () => {
  const { checkbox, cashReceiptNumber, messageInput, saveButton } = await renderOrderPage();
  fireEvent.change(messageInput, { target: { value: '테스트 메시지' } });
  fireEvent.click(checkbox);
  fireEvent.change(cashReceiptNumber, { target: { value: '잘못된번호' } });
  await checkAlertMessage(
    () => fireEvent.click(saveButton),
    '현금영수증 번호는 숫자로만 입력해주세요.',
  );
});

test('모든 필드가 올바르게 입력되었을 때 주문이 완료되는지 확인', async () => {
  const { checkbox, cashReceiptNumber, messageInput, saveButton } = await renderOrderPage();
  fireEvent.change(messageInput, { target: { value: '테스트 메시지' } });
  fireEvent.click(checkbox);
  fireEvent.change(cashReceiptNumber, { target: { value: '1234567890' } });
  await checkAlertMessage(() => fireEvent.click(saveButton), '주문이 완료되었습니다.');
});
