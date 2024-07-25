import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { worker } from '@/mocks/server';
import { OrderPage } from '@/pages/Order';
import { orderHistorySessionStorage } from '@/utils/storage';

const queryClient = new QueryClient();

beforeAll(() => {
  worker.listen();
  window.alert = jest.fn();
});
afterEach(() => {
  worker.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => worker.close());

// 현금영수증 Checkbox가 false인 경우
// 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인

test('현금영수증 체크박스가 체크되지 않은 경우 필드가 비활성화 되어있는지 확인', async () => {
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
  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  const checkbox = screen.getByTestId('needcheck');
  const cashReceiptType = screen.getByTestId('receipttype');
  const cashReceiptNumber = screen.getByTestId('inputnumber');

  // 초기 상태 확인
  expect(checkbox).not.toBeChecked();
  expect(cashReceiptType).toBeDisabled();
  expect(cashReceiptNumber).toBeDisabled();

  // 체크박스를 클릭하여 필드 활성화 확인
  fireEvent.click(checkbox);

  // 이벤트 처리 후 상태 업데이트 대기
  await waitFor(() => {
    expect(cashReceiptType).toBeEnabled();
    expect(cashReceiptNumber).toBeEnabled();
  });
});

// 폼 validation 로직 동작 테스트
test('폼 validation 로직이 정상 동작하는지 확인', async () => {
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
  await waitFor(() => expect(screen.queryByRole('spinner')).not.toBeInTheDocument(), {
    timeout: 5000,
  });

  const checkbox = screen.getByTestId('needcheck');
  const cashReceiptNumber = screen.getByTestId('inputnumber');
  const messageInput = screen.getByTestId('message');
  const saveButton = screen.getByTestId('savebutton');

  // 필수 메시지 입력값 없이 제출 버튼 클릭
  fireEvent.click(saveButton);
  await waitFor(() => expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.'));

  // 필수 메시지 입력값 채우기
  fireEvent.change(messageInput, { target: { value: '테스트 메시지' } });

  // 현금영수증 체크박스 클릭
  fireEvent.click(checkbox);

  // 현금영수증 번호 입력값 없이 제출 버튼 클릭
  fireEvent.click(saveButton);
  await waitFor(() => expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.'));

  // 현금영수증 번호에 잘못된 형식 입력
  fireEvent.change(cashReceiptNumber, { target: { value: '잘못된번호' } });
  fireEvent.click(saveButton);
  await waitFor(() =>
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.'),
  );

  // 현금영수증 번호에 올바른 형식 입력
  fireEvent.change(cashReceiptNumber, { target: { value: '1234567890' } });
  fireEvent.click(saveButton);
  await waitFor(() => expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.'));
});
