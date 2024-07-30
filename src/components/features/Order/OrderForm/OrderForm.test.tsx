import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import type { OrderFormData } from '@/types';

import { OrderForm } from './';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: 1,
      productQuantity: 1,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptType: 'PERSONAL',
      cashReceiptNumber: '',
      messageCardTextMessage: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('OrderForm', () => {
  test('현금영수증 번호 입력 없이 제출 시 에러 메시지 표시', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={{ id: 1, count: 1 }} />
      </Wrapper>,
    );

    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });
  });

  test('현금영수증에 숫자 외의 문자가 있는 경우 에러 메시지 표시', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={{ id: 1, count: 1 }} />
      </Wrapper>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ㅇㅇ' } });

    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
    });
  });

  test('메시지가 없는 경우 에러 메시지 표시', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={{ id: 1, count: 1 }} />
      </Wrapper>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(checkbox);

    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });
  });

  test('메시지 100자 초과인 경우 에러 메시지 표시', async () => {
    render(
      <Wrapper>
        <OrderForm orderHistory={{ id: 1, count: 1 }} />
      </Wrapper>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(checkbox);

    const messageInput = screen.getByPlaceholderText('메시지를 입력해주세요.') as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: 'ㅇ'.repeat(101) } });

    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
    });
  });

  test('모두 유효할 시 폼 제출', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Wrapper>
        <OrderForm orderHistory={{ id: 1, count: 1 }} />
      </Wrapper>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(checkbox);

    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1234567890' } });

    const messageInput = screen.getByPlaceholderText('메시지를 입력해주세요.') as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: '하이' } });

    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('주문이 완료되었습니다.');
    });

    mockAlert.mockRestore();
  });
});
