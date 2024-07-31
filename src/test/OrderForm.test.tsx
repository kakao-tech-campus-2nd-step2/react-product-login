import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { OrderForm } from '@/components/features/Order/OrderForm';
import type { OrderFormData, OrderHistory } from '@/types';

// Mock 데이터
const mockOrderHistory: OrderHistory = {
  id: 1,
  count: 2,
};

// 테스트용 컴포넌트: OrderForm을 사용하여 훅을 호출
const TestWrapper = ({ orderHistory }: { orderHistory: OrderHistory }) => {
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

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

test('현금영수증 체크박스 상태와 폼 validation이 정상 동작하는지 확인한다.', async () => {
  // Given: OrderForm 컴포넌트가 mockOrderHistory와 함께 렌더링된다.
  renderWithProviders(<TestWrapper orderHistory={mockOrderHistory} />);
  // console.log(screen.debug());
  // When: 현금영수증 체크박스를 클릭하여 활성화한다.
  await act(async () => {
    const checkbox = screen.getByLabelText(/현금영수증 신청/i);
    fireEvent.click(checkbox); // 체크박스 활성화

    // Then: 체크박스가 활성화되면, 관련 필드가 활성화되어야 한다.
    const receiptType = screen.getByRole('combobox');
    const receiptNumber = screen.getByPlaceholderText(/(-없이) 숫자만 입력해주세요/i);

    expect(receiptType).toBeEnabled();
    expect(receiptNumber).toBeEnabled();

    // When: 현금영수증 체크박스를 다시 클릭하여 비활성화한다.
    fireEvent.click(checkbox);

    // Then: 체크박스가 비활성화되면, 관련 필드가 비활성화되어야 한다.
    expect(receiptType).toBeDisabled();
    expect(receiptNumber).toBeDisabled();

    // When: 폼의 메시지 필드에 빈 값을 입력하고 폼 제출 버튼을 클릭한다.
    const messageField = screen.getByPlaceholderText(/선물과 함께 보낼 메시지를 적어보세요/i);
    fireEvent.change(messageField, { target: { value: '' } });
    fireEvent.click(screen.getByText(/주문하기/i));

    // Then: 메시지가 비어있는 경우, validation 에러 메시지가 표시되어야 한다.
    await waitFor(() => {
      expect(screen.getByText(/메시지를 입력해주세요./i)).toBeInTheDocument();
    });

    // When: 유효한 메시지를 입력하고 폼 제출 버튼을 다시 클릭한다.
    fireEvent.change(messageField, { target: { value: 'Valid message' } });
    fireEvent.click(screen.getByText(/주문하기/i));

    // Then: 유효한 메시지를 입력한 경우, 성공 메시지가 표시되어야 한다.
    await waitFor(() => {
      expect(screen.getByText(/주문이 완료되었습니다./i)).toBeInTheDocument();
    });
  });
});
