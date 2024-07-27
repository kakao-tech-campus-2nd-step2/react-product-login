import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { OrderForm } from '@/components/features/Order/OrderForm';

const item = {
  id: 3245119,
  count: 1,
};

const queryClient = new QueryClient();

test('카드 메시지를 입력하지 않으면 메시지 입력 안내하는 alert 발생', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={item} />
    </QueryClientProvider>
  );
  
  const cardMessage = await screen.findByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
  const submitButton = screen.getByLabelText('submitButton');

  window.alert = jest.fn();

  fireEvent.change(cardMessage, { target: { value: '' }});
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
  });
});

test('카드 메시지가 100자를 초과하면 글자 수 제한 안내하는 alert 발생', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={item} />
    </QueryClientProvider>
  );
  
  const cardMessage = await screen.findByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
  const submitButton = screen.getByLabelText('submitButton');

  window.alert = jest.fn();

  fireEvent.change(cardMessage, {target: {value: 'test message!'.repeat(10)}});
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
  });
});

test('현금 영수증 번호 필드에 숫자가 아닌 값을 입력하면 숫자 입력 안내하는 alert 발생', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={item} />
    </QueryClientProvider>
  );

  window.alert = jest.fn();

  const checkbox = await screen.findByLabelText('현금영수증 신청');
  const number = screen.getByLabelText('현금영수증 번호');
  const submitButton = screen.getByLabelText('submitButton');

  fireEvent.click(checkbox);
  fireEvent.change(number, {target: {value: 'test'}});
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
  });
});

test('현금 영수증 checkbox가 false인 경우 현금 영수증 종류와 번호 필드 비활성화', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={item} />
    </QueryClientProvider>
  );

  const checkbox = await screen.findByLabelText('현금영수증 신청');
  const type = screen.getByLabelText('현금영수증 종류');
  const number = screen.getByLabelText('현금영수증 번호');

  expect(checkbox).not.toBeChecked();
  expect(type).toBeDisabled();
  expect(number).toBeDisabled();
});

test('현금 영수증 checkbox가 true인 경우 현금 영수증 종류와 번호 필드 활성화', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={item} />
    </QueryClientProvider>
  );

  const checkbox = await screen.findByLabelText('현금영수증 신청');
  const type = screen.getByLabelText('현금영수증 종류');
  const number = screen.getByLabelText('현금영수증 번호');

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(type).not.toBeDisabled();
  expect(number).not.toBeDisabled();
});

test('현금 영수증 번호를 입력하지 않으면 입력 안내하는 alert 발생', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <OrderForm orderHistory={item} />
    </QueryClientProvider>
  );

  window.alert = jest.fn();

  const checkbox = await screen.findByLabelText('현금영수증 신청');
  const submitButton = screen.getByLabelText('submitButton');

  fireEvent.click(checkbox);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
  });
});
