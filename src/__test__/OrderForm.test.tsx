import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { OrderForm } from '../components/features/Order/OrderForm';
import type { OrderFormData, OrderHistory } from '../types';

const orderHistory: OrderHistory = {
  id: 1,
  count: 1,
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: orderHistory.id,
      productQuantity: orderHistory.count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <Wrapper>{ui}</Wrapper>
    </QueryClientProvider>,
  );
};

describe('OrderForm', () => {
  test('Given hasCashReceipt checkbox is false, When rendering the form, Then cashReceipt fields should be disabled', () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);

    const hasCashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    const cashReceiptTypeField = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    const cashReceiptNumberField = screen.getByLabelText('현금영수증 종류');

    expect(hasCashReceiptCheckbox).not.toBeChecked();
    expect(cashReceiptTypeField).toBeDisabled();
    expect(cashReceiptNumberField).toBeDisabled();
  });

  test('Given hasCashReceipt checkbox is true, When toggling the checkbox, Then cashReceipt fields should be enabled and allow input', () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);

    const hasCashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    const cashReceiptTypeField = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    const cashReceiptNumberField = screen.getByLabelText('현금영수증 종류');

    fireEvent.click(hasCashReceiptCheckbox);

    expect(hasCashReceiptCheckbox).toBeChecked();
    expect(cashReceiptTypeField).not.toBeDisabled();
    expect(cashReceiptNumberField).not.toBeDisabled();

    // 현금영수증 종류와 번호에 값을 입력합니다.
    fireEvent.change(cashReceiptTypeField, { target: { value: '1234567890' } });
    fireEvent.change(cashReceiptNumberField, { target: { value: 'PERSONAL' } });

    expect(cashReceiptTypeField).toHaveValue('1234567890');
    expect(cashReceiptNumberField).toHaveValue('PERSONAL');
  });
});
