import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import type { OrderHistory } from '@/types';

import { OrderForm } from '.';

const orderHistory: OrderHistory = {
  id: 123,
  count: 1,
};

const errorMessages = {
  cardInputIsEmpty: '메시지를 입력해주세요.',
  cardInputIsTooLong: '메시지는 100자 이내로 입력해주세요.',
  receiptNumberIsNumber: '현금영수증 번호는 숫자로만 입력해주세요.',
  receiptNumberIsEmpty: '현금영수증 번호를 입력해주세요.',
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      productId: orderHistory.id,
      productQuantity: orderHistory.count,
      hasCashReceipt: false,
      cashReceiptNumber: '',
      messageCardTextMessage: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

test('form validation 동작 테스트', () => {
  render(
    <TestWrapper>
      <OrderForm orderHistory={orderHistory} />
    </TestWrapper>,
  );
});

const submitButton = screen.getByRole('button', { name: /submit/i });
const checkbox = screen.getByLabelText(/현금영수증 신청/i);
const receiptNumberInput = screen.getByPlaceholderText(/(-없이) 숫자만 입력해주세요./i);
const messageCardInput = screen.getByPlaceholderText(/메시지를 입력해주세요/i);

//Submit 버튼
fireEvent.click(submitButton);
expect(screen.getByText(errorMessages.cardInputIsEmpty)).toBeInTheDocument();

//Submit 버튼을 클릭하면 카드 메세지 100자 이내인지 확인
fireEvent.change(messageCardInput, { target: { value: 'test'.repeat(50) } });
fireEvent.click(submitButton);
expect(screen.getByText(errorMessages.cardInputIsTooLong)).toBeInTheDocument();

//유효한 input 값으로 바꿔주기
fireEvent.change(messageCardInput, { target: { value: 'valid message example' } });
//Submit 버튼을 클릭하면 유효한 값에 대하여 에러가 발생하지 않아야한다.
fireEvent.click(submitButton);
expect(screen.queryByText(errorMessages.cardInputIsEmpty)).not.toBeInTheDocument();
expect(screen.queryByText(errorMessages.cardInputIsTooLong)).not.toBeInTheDocument();

// 체크박스가 체크되지 않은 상태인지 확인
expect(checkbox).not.toBeChecked();

//현금영수증 체크박스 체크
fireEvent.click(checkbox);
fireEvent.click(submitButton);
expect(screen.getByText(errorMessages.receiptNumberIsEmpty)).toBeInTheDocument();

// 현금영수증 번호가 숫자인지 확인
fireEvent.change(receiptNumberInput, { target: { value: 'test' } });
fireEvent.click(submitButton);
expect(screen.getByText(errorMessages.receiptNumberIsNumber)).toBeInTheDocument();

// 유효한 번호인 경우 테스트
fireEvent.change(receiptNumberInput, { target: { value: '123' } });
fireEvent.click(submitButton);
expect(screen.queryByText(errorMessages.receiptNumberIsEmpty)).not.toBeInTheDocument();
expect(screen.queryByText(errorMessages.receiptNumberIsNumber)).not.toBeInTheDocument();

//폼 제출 성공 확인
fireEvent.click(submitButton);
expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
