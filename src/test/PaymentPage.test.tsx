import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';

import { OrderForm } from '@/components/features/Order/OrderForm/index';
import type { OrderHistory } from '@/types';

const orderHistory: OrderHistory = {
  id: 1,
  count: 1,
};

describe('PaymentPage', () => {
  test('disables cash receipt fields when checkbox is unchecked', () => {
    render(<OrderForm orderHistory={orderHistory} />);

    const checkbox = screen.getByLabelText('현금영수증 신청');
    const cashReceiptType = screen.getByPlaceholderText('개인소득공제');
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(checkbox).not.toBeChecked();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(cashReceiptType).not.toBeDisabled();
    expect(cashReceiptNumber).not.toBeDisabled();
  });

  test('validates form fields correctly', async () => {
    render(<OrderForm orderHistory={orderHistory} />);

    const submitButton = screen.getByText(/결제하기/);

    fireEvent.click(submitButton);

    expect(await screen.findByText('메시지를 입력해주세요.')).toBeInTheDocument();

    const messageInput = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    fireEvent.change(messageInput, { target: { value: 'This is a sample message' } });

    fireEvent.click(submitButton);

    expect(await screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
  });

  test('validates cash receipt number correctly', async () => {
    render(<OrderForm orderHistory={orderHistory} />);

    const checkbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(checkbox);

    const submitButton = screen.getByText(/결제하기/);
    fireEvent.click(submitButton);

    expect(await screen.findByText('현금영수증 번호를 입력해주세요.')).toBeInTheDocument();

    const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    fireEvent.change(cashReceiptNumberInput, { target: { value: '12345' } });

    fireEvent.click(submitButton);

    expect(await screen.queryByText('현금영수증 번호를 입력해주세요.')).not.toBeInTheDocument();
  });
});
