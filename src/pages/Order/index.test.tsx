import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { OrderForm } from '@/components/features/Order/OrderForm';
import type { OrderFormData, OrderHistory } from '@/types';

type Props = {
  orderHistory: OrderHistory;
};

const MockOrderForm = ({ orderHistory }: Props) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: orderHistory.id,
      productQuantity: orderHistory.count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <OrderForm orderHistory={orderHistory} />
    </FormProvider>
  );
};

const orderHistory = {
  id: 1,
  count: 1,
};

const queryClient = new QueryClient();

describe('OrderForm', () => {
  const originalAlert = global.alert;

  beforeEach(() => {
    global.alert = jest.fn();
  });

  afterEach(() => {
    global.alert = originalAlert;
  });

  describe('현금영수증 체크박스 상태에 따른 필드 활성화/비활성화', () => {
    beforeEach(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MockOrderForm orderHistory={orderHistory} />
        </QueryClientProvider>,
      );
    });

    it('현금영수증 체크박스가 false인 경우, 현금영수증 종류와 번호 필드가 비활성화되어야 한다.', async () => {
      // given
      const cashReceiptCheckbox = (await screen.findByTestId(
        'has-cash-receipt',
      )) as HTMLInputElement;
      const cashReceiptTypeField = (await screen.findByTestId(
        'cash-receipt-type',
      )) as HTMLInputElement;
      const cashReceiptNumberField = (await screen.findByTestId(
        'cash-receipt-number',
      )) as HTMLInputElement;

      // when
      // 체크박스 기본값은 false

      // then
      expect(cashReceiptCheckbox).not.toBeChecked();
      expect(cashReceiptTypeField).toBeDisabled();
      expect(cashReceiptNumberField).toBeDisabled();
    });

    it('현금영수증 체크박스가 true로 변경된 경우, 현금영수증 종류와 번호 필드가 활성화되어야 한다.', async () => {
      // given
      const cashReceiptCheckbox = (await screen.findByTestId(
        'has-cash-receipt',
      )) as HTMLInputElement;
      fireEvent.click(cashReceiptCheckbox);

      // when
      const cashReceiptTypeField = (await screen.findByTestId(
        'cash-receipt-type',
      )) as HTMLInputElement;
      const cashReceiptNumberField = (await screen.findByTestId(
        'cash-receipt-number',
      )) as HTMLInputElement;

      // then
      expect(cashReceiptTypeField).not.toBeDisabled();
      expect(cashReceiptNumberField).not.toBeDisabled();
    });
  });

  describe('폼 유효성 검사', () => {
    beforeEach(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MockOrderForm orderHistory={orderHistory} />
        </QueryClientProvider>,
      );
    });

    it('메시지 필드가 비어있으면 "메시지를 입력해주세요."라는 경고를 출력한다.', async () => {
      // given
      const submitButton = await screen.findByText(/결제하기/i);

      // when
      fireEvent.click(submitButton);

      // then
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
      });
    });

    it('현금영수증 체크박스가 선택되었으나 현금영수증 번호가 입력되지 않으면 "현금영수증 번호를 입력해주세요."라는 경고를 출력한다.', async () => {
      // given
      const submitButton = await screen.findByText(/결제하기/i);
      const cashReceiptCheckbox = (await screen.findByTestId(
        'has-cash-receipt',
      )) as HTMLInputElement;

      // when
      fireEvent.click(cashReceiptCheckbox);
      fireEvent.click(submitButton);

      // then
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
      });
    });

    it('잘못된 형식의 현금영수증 번호가 입력되면 "현금영수증 번호는 숫자로만 입력해주세요."라는 경고를 출력한다.', async () => {
      // given
      const submitButton = await screen.findByText(/결제하기/i);
      const cashReceiptCheckbox = (await screen.findByTestId(
        'has-cash-receipt',
      )) as HTMLInputElement;
      const cashReceiptNumberField = (await screen.findByTestId(
        'cash-receipt-number',
      )) as HTMLInputElement;

      // when
      fireEvent.click(cashReceiptCheckbox);
      fireEvent.change(cashReceiptNumberField, { target: { value: 'abc123' } });
      fireEvent.click(submitButton);

      // then
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
      });
    });

    it('모든 필드가 유효하면 "주문이 완료되었습니다."라는 메시지를 표시한다.', async () => {
      // given
      const submitButton = await screen.findByText(/결제하기/i);
      const messageTextarea = screen.getByPlaceholderText(
        /선물과 함께 보낼 메시지를 적어보세요/i,
      ) as HTMLTextAreaElement;
      const cashReceiptCheckbox = (await screen.findByTestId(
        'has-cash-receipt',
      )) as HTMLInputElement;
      const cashReceiptNumberField = (await screen.findByTestId(
        'cash-receipt-number',
      )) as HTMLInputElement;

      // when
      fireEvent.change(messageTextarea, { target: { value: 'Hello World' } });
      fireEvent.click(cashReceiptCheckbox);
      fireEvent.change(cashReceiptNumberField, { target: { value: '1234567890' } });
      fireEvent.click(submitButton);

      // then
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
      });
    });
  });
});
