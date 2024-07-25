import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import * as api from '@/api/hooks/useGetProductDetail';
import type { OrderHistory } from '@/types';

import { OrderForm } from './index';

// Given: Mock Order History
const mockOrderHistory: OrderHistory = {
  id: 1,
  count: 2,
};

// Given: Mock API
jest.mock('@/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn(),
}));

// Given: Wrapper Component
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>
    </QueryClientProvider>
  );
};

describe('OrderForm', () => {
  // Given: Mock API Response
  beforeEach(() => {
    (api.useGetProductDetail as jest.Mock).mockReturnValue({
      data: { imageUrl: 'test-image.jpg', name: '테스트 상품', price: 1000 },
    });
  });

  test('폼이 초기 값으로 렌더링 되는지 확인', async () => {
    // When: Orderform 랜더링 될 때
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>,
    );

    // Then: 폼을 클릭했을 때 초기값으로 랜더링 되는지
    await waitFor(() => {
      expect(screen.getByText(/선물내역/i)).toBeInTheDocument();
      expect(screen.getByText(/결제 정보/i)).toBeInTheDocument();
    });
  });

  test('폼을 유효성 검사하고 오류 메시지를 표시하는지 확인', async () => {
    // When: Order Component rendering, 제출 폼 눌렀을 때
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>,
    );

    fireEvent.click(screen.getByText(/2000원 결제하기/i)); // 결제하기 버튼 클릭

    // Then: 그냥 결제하기 눌렀을 때
    const errorMessage = await screen.findByText(/메시지를 입력해주세요./i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('폼이 올바르게 제출되는지 확인', async () => {
    // Given: Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // When: Orderform redering, 입력 값 넣고, 제출하기 눌렀을 때
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>,
    );

    fireEvent.change(screen.getByPlaceholderText(/선물과 함께 보낼 메시지를 적어보세요/i), {
      target: { value: '테스트 메시지' },
    });

    fireEvent.click(screen.getByText(/2000원 결제하기/i));

    // Then: 옳다면
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    expect(alertMock).toHaveBeenCalledWith('주문이 완료되었습니다.');

    // Restore alert mock
    alertMock.mockRestore();
  });

  test('현금영수증 Checkbox가 false인 경우, 현금영수증 종류와 현금영수증 번호 필드가 비활성화 되는지 확인', async () => {
    // When: OrderForm 컴포넌트를 렌더링
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>,
    );

    // Then: 현금영수증 체크박스가 false일 때, 현금영수증 종류와 현금영수증 번호 필드가 비활성화 되는지 확인
    await waitFor(() => {
      const cashReceiptCheckbox = screen.getByLabelText(/현금영수증 신청/i);
      const cashReceiptTypeSelects = screen.queryAllByLabelText(/현금영수증 종류/i);
      const cashReceiptNumberInputs = screen.queryAllByLabelText(/현금영수증 번호/i);

      // 정확한 요소를 찾기 위해 첫 번째 요소를 선택
      const cashReceiptTypeSelect = cashReceiptTypeSelects[0] as HTMLSelectElement;
      const cashReceiptNumberInput = cashReceiptNumberInputs[0] as HTMLInputElement;

      expect(cashReceiptCheckbox).toBeInTheDocument();
      expect(cashReceiptTypeSelect).toBeDisabled();
      expect(cashReceiptNumberInput).toBeDisabled();
    });
  });

  test('현금영수증 Checkbox가 true인 경우, 현금영수증 종류와 현금영수증 번호 필드가 활성화 되고 값이 입력되는지 확인', async () => {
    // When: OrderForm 컴포넌트를 렌더링
    render(
      <Wrapper>
        <OrderForm orderHistory={mockOrderHistory} />
      </Wrapper>,
    );

    // 현금영수증 체크박스를 클릭하여 true로 설정
    fireEvent.click(screen.getByLabelText(/현금영수증 신청/i));

    // Then: 현금영수증 종류와 현금영수증 번호 필드가 활성화 되고 값이 입력되는지 확인
    await waitFor(() => {
      const cashReceiptTypeSelects = screen.queryAllByLabelText(/현금영수증 종류/i);
      const cashReceiptNumberInputs = screen.queryAllByLabelText(/현금영수증 번호/i);

      // 정확한 요소를 찾기 위해 첫 번째 요소를 선택
      const cashReceiptTypeSelect = cashReceiptTypeSelects[0] as HTMLSelectElement;
      const cashReceiptNumberInput = cashReceiptNumberInputs[0] as HTMLInputElement;

      expect(cashReceiptTypeSelect).toBeEnabled();
      expect(cashReceiptNumberInput).toBeEnabled();

      // 현금영수증 종류를 선택하고 번호를 입력
      fireEvent.change(cashReceiptTypeSelect, { target: { value: 'PERSONAL' } });
      fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

      expect(cashReceiptTypeSelect.value).toBe('PERSONAL');
      expect(cashReceiptNumberInput.value).toBe('1234567890');
    });
  });
});
