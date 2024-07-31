import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

//import React from 'react';
import { OrderForm } from '@/components/features/Order/OrderForm/index';
import type { OrderHistory } from '@/types';

// Mock data for the test
const mockOrderHistory: OrderHistory = {
  id: 1,
  count: 2,
};

// Test suite for OrderForm component
describe('OrderForm', () => {
  test('현금영수증 Checkbox가 false인 경우 관련 field가 비활성화 되어야 합니다.', () => {
    render(<OrderForm orderHistory={mockOrderHistory} />);

    // Initial state checks
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증') as HTMLInputElement;
    const receiptTypeField = screen.getByLabelText('현금영수증 종류') as HTMLSelectElement;
    const receiptNumberField = screen.getByLabelText('현금영수증 번호') as HTMLInputElement;

    expect(receiptTypeField).toBeDisabled();
    expect(receiptNumberField).toBeDisabled();

    // Enable fields by checking the checkbox
    fireEvent.click(cashReceiptCheckbox);

    // Verify fields are enabled after checkbox is checked
    expect(receiptTypeField).toBeEnabled();
    expect(receiptNumberField).toBeEnabled();
  });

  test('현금영수증 Checkbox가 true인 경우 현금영수증 종류, 번호 field에 값이 입력되어야 합니다.', () => {
    render(<OrderForm orderHistory={mockOrderHistory} />);

    // Enable fields by checking the checkbox
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증') as HTMLInputElement;
    fireEvent.click(cashReceiptCheckbox);

    // Get fields and enter values
    const receiptTypeField = screen.getByLabelText('현금영수증 종류') as HTMLSelectElement;
    const receiptNumberField = screen.getByLabelText('현금영수증 번호') as HTMLInputElement;

    fireEvent.change(receiptTypeField, { target: { value: 'PERSONAL' } });
    fireEvent.change(receiptNumberField, { target: { value: '01012345678' } });

    // Verify field values
    expect(receiptTypeField.value).toBe('PERSONAL');
    expect(receiptNumberField.value).toBe('01012345678');
  });

  test('Form의 validation 로직이 정상 동작해야 합니다.', async () => {
    render(<OrderForm orderHistory={mockOrderHistory} />);

    // Submit the form without filling required fields
    const submitButton = screen.getByText('결제하기');
    fireEvent.click(submitButton);

    // Check for validation error message
    await waitFor(() => {
      const errorMessage = screen.getByText('현금영수증 번호를 입력해주세요.');
      expect(errorMessage).toBeInTheDocument();
    });

    // Fill required fields and resubmit
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증') as HTMLInputElement;
    fireEvent.click(cashReceiptCheckbox);

    const receiptNumberField = screen.getByLabelText('현금영수증 번호') as HTMLInputElement;
    fireEvent.change(receiptNumberField, { target: { value: '1234567890' } });

    const messageCardField = screen.getByPlaceholderText(
      '선물과 함께 보낼 메시지를 적어보세요',
    ) as HTMLTextAreaElement;
    fireEvent.change(messageCardField, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    // Verify successful form submission message
    await waitFor(() => {
      const successMessage = screen.getByText('주문이 완료되었습니다.');
      expect(successMessage).toBeInTheDocument();
    });
  });
});
