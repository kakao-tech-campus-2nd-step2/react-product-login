import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import { OrderForm } from './index';

type OrderHistory = {
    id: number;
    count: number;
  };

const TestComponent = ({ orderHistory }: { orderHistory: OrderHistory }) => {
  const methods = useForm({
    defaultValues: {
      productId: orderHistory.id,
      productQuantity: orderHistory.count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptNumber: '',
      cashReceiptType: '',
      messageCardTextMessage: '',
    },
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>
        <OrderForm orderHistory={orderHistory} />
      </FormProvider>
    </QueryClientProvider>
  );
};

describe('OrderForm', () => {
  const orderHistory = { id: 1, count: 2 };

  beforeEach(async () => {
    await act(async () => {
      render(<TestComponent orderHistory={orderHistory} />);
    });
  });

   test('현금영수증 필드 활성화 및 비활성화', async () => {
    await act(async () => {
      const checkbox = screen.getByTestId('cash-receipt-checkbox');
      fireEvent.click(checkbox); // 활성화
      await waitFor(() => {
        expect(screen.getByTestId('cash-receipt-type')).toBeEnabled();
        expect(screen.getByTestId('cash-receipt-number')).toBeEnabled();
      });

      fireEvent.click(checkbox); // 비활성화
      await waitFor(() => {
        expect(screen.getByTestId('cash-receipt-type')).toBeDisabled();
        expect(screen.getByTestId('cash-receipt-number')).toBeDisabled();
      });
    });
  });

  test('현금영수증 번호 숫자만 허용 및 필수 입력 검증', async () => {
    await act(async () => {
      const checkbox = screen.getByTestId('cash-receipt-checkbox');
      fireEvent.click(checkbox); // 활성화
      const cashReceiptInput = screen.getByTestId('cash-receipt-number');
      userEvent.type(cashReceiptInput, '123ABC');
      fireEvent.submit(screen.getByRole('form'));
      await waitFor(() => screen.getByText('현금영수증 번호는 숫자로만 입력해주세요.'));

      userEvent.clear(cashReceiptInput);
      fireEvent.submit(screen.getByRole('form'));
      await waitFor(() => screen.getByText('현금영수증 번호를 입력해주세요.'));
    });
  });

  test('모든 검증을 통과했을 때만 폼 제출 허용', async () => {
    await act(async () => {
      const submitButton = screen.getByText(/결제하기/);
      const checkbox = screen.getByTestId('cash-receipt-checkbox');
      userEvent.click(checkbox);
      const cashReceiptNumberInput = screen.getByTestId('cash-receipt-number');
      userEvent.type(cashReceiptNumberInput, '1234567890');
      const messageInput = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
      userEvent.type(messageInput, 'Happy Birthday!');
      fireEvent.change(screen.getByTestId('cash-receipt-type'), { target: { value: 'PERSONAL' } });

      fireEvent.submit(submitButton);
      await waitFor(() => screen.getByText('주문이 완료되었습니다.'));
    });
  });
});