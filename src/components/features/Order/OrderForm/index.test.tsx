import '@testing-library/jest-dom/extend-expect';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent,render, screen } from '@testing-library/react';
import { FormProvider,useForm } from 'react-hook-form';

import type { OrderFormData } from '@/types';

import { OrderForm } from '.';

const queryClient = new QueryClient();

const Wrapper = ({ children, orderHistory }: { children: React.ReactNode, orderHistory: { id: number, count: number } }) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: orderHistory.id,
      productQuantity: orderHistory.count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptType: 'PERSONAL',
      cashReceiptNumber: '',
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>
    </QueryClientProvider>
  );
};

describe('OrderForm 컴포넌트', () => {
  const orderHistory = {
    id: 1,
    count: 2,
  };

  test('폼이 렌더링되는지 확인', () => {
    render(
      <Wrapper orderHistory={orderHistory}>
        <OrderForm orderHistory={orderHistory} />
      </Wrapper>
    );
    expect(screen.getByText('주문 정보')).toBeInTheDocument();
  });

  test('유효하지 않은 입력값에 대해 에러 메시지 표시', () => {
    render(
      <Wrapper orderHistory={orderHistory}>
        <OrderForm orderHistory={orderHistory} />
      </Wrapper>
    );
    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText('메시지를 입력해주세요.')).toBeInTheDocument();
  });

  test('유효한 입력값으로 폼 제출', () => {
    render(
      <Wrapper orderHistory={orderHistory}>
        <OrderForm orderHistory={orderHistory} />
      </Wrapper>
    );
    
    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), { target: { value: 'Test message' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
  });

  test('현금영수증 체크박스 선택 상태에 따라 필드가 활성화/비활성화 되는지 확인', () => {
    render(
      <Wrapper orderHistory={orderHistory}>
        <OrderForm orderHistory={orderHistory} />
      </Wrapper>
    );

    const cashReceiptCheckbox = screen.getByLabelText(/현금영수증 신청/i);
    const cashReceiptTypeField = screen.getByRole('combobox');
    const cashReceiptNumberField = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    fireEvent.click(cashReceiptCheckbox);
    expect(cashReceiptTypeField).toBeDisabled();
    expect(cashReceiptNumberField).toBeDisabled();

    fireEvent.click(cashReceiptCheckbox);
    expect(cashReceiptTypeField).not.toBeDisabled();
    expect(cashReceiptNumberField).not.toBeDisabled();

    fireEvent.change(cashReceiptTypeField, { target: { value: 'PERSONAL' } });
    fireEvent.change(cashReceiptNumberField, { target: { value: '1234567890' } });

    expect(cashReceiptTypeField).toHaveValue('PERSONAL');
    expect(cashReceiptNumberField).toHaveValue('1234567890');
  });

  test('폼 유효성 검증 로직이 올바르게 작동하는지 확인', () => {
    render(
      <Wrapper orderHistory={orderHistory}>
        <OrderForm orderHistory={orderHistory} />
      </Wrapper>
    );

    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText('메시지를 입력해주세요.')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/현금영수증 신청/i));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'PERSONAL' } });
    fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), { target: { value: 'abc' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText('현금영수증 번호는 숫자로만 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), { target: { value: 'Test message' } });
    fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), { target: { value: '1234567890' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
    expect(screen.queryByText('현금영수증 번호는 숫자로만 입력해주세요.')).not.toBeInTheDocument();
  });
});