import { fireEvent,render, screen } from '@testing-library/react';

import type { OrderHistory } from '@/types';

import { OrderForm } from './index';

// 가짜 OrderHistory 데이터 생성
const orderHistory: OrderHistory = {
  id: 1,
  count: 1,
  // 필요한 다른 필드 추가
};

describe('OrderForm 컴포넌트 통합 테스트', () => {
  test('현금영수증 체크박스가 false인 경우, 현금영수증 종류와 번호 필드가 비활성화되어 있어야 합니다', () => {
    // Given: OrderForm 컴포넌트가 렌더링되었을 때
    render(<OrderForm orderHistory={orderHistory} />);

    // When: 체크박스가 체크 해제되어 있을 때
    const cashReceiptCheckbox = screen.getByLabelText(/현금영수증/i);
    const cashReceiptType = screen.getByLabelText(/현금영수증 종류/i);
    const cashReceiptNumber = screen.getByLabelText(/현금영수증 번호/i);

    // Then: 현금영수증 종류와 번호 필드가 비활성화되어 있어야 합니다
    expect(cashReceiptCheckbox).not.toBeChecked();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();
  });

  test('현금영수증 체크박스가 true인 경우, 현금영수증 종류와 번호 필드가 활성화되어 있어야 합니다', () => {
    // Given: OrderForm 컴포넌트가 렌더링되었을 때
    render(<OrderForm orderHistory={orderHistory} />);

    // When: 체크박스를 클릭하여 활성화되었을 때
    const cashReceiptCheckbox = screen.getByLabelText(/현금영수증/i);
    fireEvent.click(cashReceiptCheckbox);

    const cashReceiptType = screen.getByLabelText(/현금영수증 종류/i);
    const cashReceiptNumber = screen.getByLabelText(/현금영수증 번호/i);

    // Then: 현금영수증 종류와 번호 필드가 활성화되어 있어야 합니다
    expect(cashReceiptCheckbox).toBeChecked();
    expect(cashReceiptType).toBeEnabled();
    expect(cashReceiptNumber).toBeEnabled();
  });

  test('폼이 유효하지 않을 때 검증 메시지가 표시되어야 합니다', () => {
    // Given: OrderForm 컴포넌트가 렌더링되었을 때
    render(<OrderForm orderHistory={orderHistory} />);

    // When: 필수 입력 필드가 비어 있는 상태에서 폼을 제출할 때
    const submitButton = screen.getByRole('button', { name: /제출/i });
    fireEvent.click(submitButton);

    // Then: 검증 메시지가 표시되어야 합니다
    const errorMessage = screen.getByText(/현금영수증 번호를 입력해주세요./i);
    expect(errorMessage).toBeInTheDocument();
  });
});
