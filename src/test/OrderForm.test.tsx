import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { OrderForm } from '@/components/features/Order/OrderForm/index';
import { OrderHistory } from '@/types';
import '@testing-library/jest-dom/extend-expect';

describe('OrderForm Component', () => {
  const orderHistory: OrderHistory = {
    id: 1,
    count: 2,
  };

  // FormProvider를 사용하는 렌더 함수
  const renderOrderForm = () => {
    const methods = useForm({
      defaultValues: {
        productId: orderHistory.id,
        productQuantity: orderHistory.count,
        senderId: 0,
        receiverId: 0,
        hasCashReceipt: false,
      },
    });

    return render(
      <FormProvider {...methods}>
        <OrderForm orderHistory={orderHistory} />
      </FormProvider>,
    );
  };

  test('현금영수증 Checkbox가 false인 경우 현금영수증 종류와 번호 필드가 비활성화 되는지 확인', () => {
    renderOrderForm();

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 발급 여부');
    const cashReceiptType = screen.getByLabelText('현금영수증 종류');
    const cashReceiptNumber = screen.getByLabelText('현금영수증 번호');

    expect(cashReceiptCheckbox).not.toBeChecked();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();
  });

  test('현금영수증 Checkbox가 true인 경우 현금영수증 종류와 번호 필드가 활성화 되는지 확인', () => {
    renderOrderForm();

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 발급 여부');
    const cashReceiptType = screen.getByLabelText('현금영수증 종류');
    const cashReceiptNumber = screen.getByLabelText('현금영수증 번호');

    fireEvent.click(cashReceiptCheckbox);

    expect(cashReceiptCheckbox).toBeChecked();
    expect(cashReceiptType).toBeEnabled();
    expect(cashReceiptNumber).toBeEnabled();
  });

  test('form validation 로직이 정상 동작하는지 확인', () => {
    renderOrderForm();

    const submitButton = screen.getByText('주문 완료');

    const messageCardText = screen.getByLabelText('메시지 카드 내용');

    fireEvent.click(submitButton);
    expect(screen.getByText('메시지를 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(messageCardText, { target: { value: 'a'.repeat(101) } });
    fireEvent.click(submitButton);
    expect(screen.getByText('메시지는 100자 이내로 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(messageCardText, { target: { value: '올바른 메시지' } });
    fireEvent.click(submitButton);
    expect(screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
    expect(screen.queryByText('메시지는 100자 이내로 입력해주세요.')).not.toBeInTheDocument();
  });
});
