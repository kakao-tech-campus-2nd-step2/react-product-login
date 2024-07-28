import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import ReceiptForm from '@components/features/Order/Payment/ReceiptForm';
import OrderMessage from '@/components/features/Order/OrderMessage';
import { OrderDataFormValues } from '@/pages/Order';

jest.mock('@components/features/Order/Payment/ReceiptForm/validation', () => ({
  validatePayment: jest.fn(),
}));

const mockValidatePayment = require('@components/features/Order/Payment/ReceiptForm/validation').validatePayment;

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  const methods = useForm<OrderDataFormValues>({
    defaultValues: {
      message: '',
      hasCashReceipt: false,
      cashReceiptType: '개인소득공제',
      cashReceiptNumber: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

const renderPaymentForm = () =>
  render(
    <Wrapper>
      <OrderMessage />
      <ReceiptForm />
    </Wrapper>,
  );

describe('ReceiptForm 컴포넌트', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  test('현금영수증 체크박스가 체크된 상태에서 필드가 비어있으면 에러 메시지를 표시해야 한다', async () => {
    renderPaymentForm();

    // Mock validatePayment to return an error message
    mockValidatePayment.mockImplementation(() => 'Error: Cash receipt number is required');

    // Given 현금영수증 체크박스가 체크된 상태일 때
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(cashReceiptCheckbox);

    await waitFor(() => {
      expect(cashReceiptCheckbox).toBeChecked();
    });

    // When 폼이 비어있는 현금영수증 번호로 제출되면
    const submitButton = screen.getByRole('button', { name: /49900원 결제하기/i });
    fireEvent.click(submitButton);

    // Then 유효성 검사 함수가 호출되고 에러 메시지가 표시되어야 한다
    await waitFor(() => {
      expect(mockValidatePayment).toHaveBeenCalledWith('', true, '');
      expect(window.alert).toHaveBeenCalledWith('Error: Cash receipt number is required');
    });
  });

  test('현금영수증 필드를 채운 후 제출하면 성공 메시지를 표시해야 한다', async () => {
    renderPaymentForm();

    // Given 현금영수증 체크박스가 체크된 상태일 때
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(cashReceiptCheckbox);

    await waitFor(() => {
      expect(cashReceiptCheckbox).toBeChecked();
    });

    // When 현금영수증 번호를 입력하고 폼을 제출하면
    const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

    // Mock validatePayment to return no error
    mockValidatePayment.mockImplementation(() => '');

    const submitButton = screen.getByRole('button', { name: /49900원 결제하기/i });
    fireEvent.click(submitButton);

    // Then 유효성 검사 함수가 호출되고 성공 메시지가 표시되어야 한다
    await waitFor(() => {
      expect(mockValidatePayment).toHaveBeenCalledWith('', true, '1234567890');
      expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
    });
  });
});
