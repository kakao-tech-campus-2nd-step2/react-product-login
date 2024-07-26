import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { OrderForm } from '..';

test('현금영수증 미발급시 현금영수증 타입 비활성화', async () => {
  const orderHistory = {
    id: 3245119,
    count: 1,
  };
  render(
    <QueryClientProvider client={new QueryClient()}>
      <OrderForm orderHistory={orderHistory} />
    </QueryClientProvider>,
  );

  const checkbox = await screen.findByLabelText('현금영수증 신청');
  const select = screen.getByTestId('cashReceiptType');
  const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

  // 초기 상태에서 checkbox는 체크되어 있지 않아야 합니다.
  expect(checkbox).not.toBeChecked();
  expect(select).toBeDisabled();
  expect(input).toBeDisabled();

  //checkbox를 체크합니다.
  fireEvent.click(checkbox);

  // checkbox가 체크되었을 때 select와 input이 활성화(enabled) 상태인지 확인합니다.
  expect(select).not.toBeDisabled();
  expect(input).not.toBeDisabled();
});

test('현금영수증 발급시 현금영수증 타입과 전화번호 입력 필수', async () => {
  const orderHistory = {
    id: 3245119,
    count: 1,
  };
  render(
    <QueryClientProvider client={new QueryClient()}>
      <OrderForm orderHistory={orderHistory} />
    </QueryClientProvider>,
  );

  const checkbox = await screen.findByLabelText('현금영수증 신청');
  const select = screen.getByTestId('cashReceiptType');
  const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
  const button = screen.getByText(/원 결제하기/);

  // 초기 상태에서 checkbox는 체크되어 있을 때.
  fireEvent.click(checkbox);

  //submit 버튼을 누르면
  fireEvent.click(button);

  // checkbox가 체크되었을 때 select와 input이 비어있지 않은지 확인
  expect(select).not.toBe(undefined);
  expect(input).not.toBe(undefined);
});
