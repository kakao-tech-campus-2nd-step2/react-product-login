import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { queryClient } from '@/api/instance';

import { OrderForm } from '.';

const orderFormRender = () => {
  const orderHistory = {
    id: 3245119,
    count: 1,
  };
  window.alert = jest.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={orderHistory} />
    </QueryClientProvider>,
  );
};

test('현금영수증 Checkbox가 true인 경우 현금영수증 종류, 번호 field에 값이 입력되어야 함', async () => {
  orderFormRender();

  await screen.findByLabelText('현금영수증 신청');
  await screen.findByText('원 결제하기', { exact: false });

  const checkbox = screen.getByLabelText('현금영수증 신청');
  const submit = screen.getByText('원 결제하기', { exact: false });

  fireEvent.click(checkbox);
  fireEvent.click(submit);

  expect(window.alert).toBeCalled();

  const select = screen.getByRole('combobox');
  const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

  fireEvent.change(select, { target: { value: 'PERSONAL' } });
  fireEvent.change(input, { target: { value: '1234567890' } });
});

test('message card에 메시지가 입력되어야 함', async () => {
  orderFormRender();

  await screen.findByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
  screen.debug();

  const textarea = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
  const submit = screen.getByText('원 결제하기', { exact: false });

  fireEvent.click(submit);

  expect(window.alert).toBeCalled();

  fireEvent.change(textarea, { target: { value: '테스트 메시지' } });
});
