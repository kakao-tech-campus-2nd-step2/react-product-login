import '@testing-library/jest-dom/extend-expect';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { OrderForm } from '@/components/features/Order/OrderForm';
import { server } from '@/mocks/server';
import { AuthProvider } from '@/provider/Auth';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();
const orderHistory = { id: 3245119, count: 3 };

test('Field active status according to cash receipt check box', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthProvider>
          <OrderForm orderHistory={orderHistory} />
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  //given: 상품결제 페이지
  const checkbox = screen.getByLabelText('현금영수증 신청');
  const cashReceiptType = screen.getByLabelText('cashReceiptType');
  const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

  //when: 체크박스가 체크가 체크되지 않았을때
  expect(checkbox).not.toBeChecked();

  //then: 영수증 타입, 영수증 번호 필드가 비활성화됨
  expect(cashReceiptType).toBeDisabled();
  expect(cashReceiptNumber).toBeDisabled();

  //when: 체크박스를 클릭 했을때
  fireEvent.click(checkbox);

  //then: 체크박스, 영수증 타입, 영수증 번호 필드 활성화됨
  expect(checkbox).toBeChecked();
  expect(cashReceiptType).toBeEnabled();
  expect(cashReceiptNumber).toBeEnabled();
});

test('Verify that the verification logic of the form is working properly', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={orderHistory} />
    </QueryClientProvider>,
  );

  //given: 상품 결제 페이지
  const checkbox = screen.getByLabelText('현금영수증 신청');
  const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
  const messageCardTextMessage = screen.getByPlaceholderText('메시지를 입력해주세요.');
  const submitButton = screen.getByText('10000원 결제하기');

  //when: 현금영수증 체크박스 체크 후 번호 입력하지 않고 제출했을때
  fireEvent.click(checkbox);
  fireEvent.click(submitButton);

  //then: 현금영수증번호 입력 요구 경고창 호출
  expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');

  //when: 현금영수증 번호에 잘못된 값 입력 후 제출했을때
  userEvent.type(cashReceiptNumber, 'abc123');
  fireEvent.click(submitButton);

  //then: 현금영수증 숫자 입력 경고창 호출
  expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');

  //when: 101자 메시지를 입력 후 제출했을때
  userEvent.type(messageCardTextMessage, 'a'.repeat(101));
  fireEvent.click(submitButton);

  //then: 메시지 100자 이내 입력 경고창 호출
  expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');

  //when: 올바른 입력 후 제출했을때
  userEvent.clear(messageCardTextMessage);
  userEvent.type(messageCardTextMessage, '상품 주문');
  fireEvent.click(submitButton);

  //then: 주문 완료 경호창 호출
  expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
});
