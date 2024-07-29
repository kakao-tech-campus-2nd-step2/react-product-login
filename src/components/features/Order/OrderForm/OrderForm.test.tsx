import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { OrderHistory } from '@/types';

import { OrderForm } from '.';

const orderHistory: OrderHistory = {
  id: 1,
  count: 1,
};

test('결제하기 페이지의 Form과 관련된 통합 테스트', async () => {
  window.alert = jest.fn();

  render(
    <QueryClientProvider client={new QueryClient()}>
      <OrderForm orderHistory={orderHistory} />
    </QueryClientProvider>,
  );

  await waitFor(async () => {
    const cashReceiptCheckbox = await screen.findByLabelText('현금영수증 신청');
    const cashReceiptType = screen.getByTestId('cashReceiptType');
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(cashReceiptCheckbox).not.toBeChecked();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();

    fireEvent.click(cashReceiptCheckbox);

    expect(cashReceiptCheckbox).toBeChecked();
    expect(cashReceiptType).not.toBeDisabled();
    expect(cashReceiptNumber).not.toBeDisabled();
  });

  await waitFor(async () => {
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    const submitButton = screen.getByTestId('payButton');

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });

    const validCashReceiptNumber = '1234567890';

    fireEvent.change(cashReceiptNumber, { target: { value: validCashReceiptNumber } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });
  });
});
