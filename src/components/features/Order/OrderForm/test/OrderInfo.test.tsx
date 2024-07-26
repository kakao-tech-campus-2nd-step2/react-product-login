import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';

import type { OrderHistory } from '@/types';

import { OrderForm } from '..';

jest.mock('@/components/common/layouts/SplitLayout', () => ({
  SplitLayout: ({ children }: PropsWithChildren) => (
    <div data-testid="split-layout">{children}</div>
  ),
}));

jest.mock('./OrderInfo', () => ({
  OrderFormOrderInfo: () => <div data-testid="order-info">주문 정보</div>,
}));

jest.mock('./MessageCard', () => ({
  OrderFormMessageCard: () => <div data-testid="message-card">메시지 카드</div>,
}));

jest.mock('./GoodsInfo', () => ({
  GoodsInfo: () => <div data-testid="goods-info">상품 정보</div>,
}));

const mockOrderHistory: OrderHistory = {
  id: 1,
  count: 1,
};

describe('OrderForm 컴포넌트', () => {
  describe('현금영수증 관련 기능', () => {
    it('현금영수증 Checkbox가 false일 때 현금영수증 종류, 번호 field가 비활성화된다', () => {
      render(<OrderForm orderHistory={mockOrderHistory} />);

      const cashReceiptCheckbox = screen.getByRole('checkbox', { name: /현금영수증/i });
      const cashReceiptTypeSelect = screen.getByRole('combobox', { name: /현금영수증 종류/i });
      const cashReceiptNumberInput = screen.getByRole('textbox', { name: /현금영수증 번호/i });

      expect(cashReceiptCheckbox).not.toBeChecked();
      expect(cashReceiptTypeSelect).toBeDisabled();
      expect(cashReceiptNumberInput).toBeDisabled();
    });

    it('현금영수증 Checkbox가 true일 때 현금영수증 종류, 번호 field가 활성화된다', async () => {
      render(<OrderForm orderHistory={mockOrderHistory} />);

      const cashReceiptCheckbox = screen.getByRole('checkbox', { name: /현금영수증/i });
      const cashReceiptTypeSelect = screen.getByRole('combobox', { name: /현금영수증 종류/i });
      const cashReceiptNumberInput = screen.getByRole('textbox', { name: /현금영수증 번호/i });

      userEvent.click(cashReceiptCheckbox);

      await waitFor(() => {
        expect(cashReceiptCheckbox).toBeChecked();
        expect(cashReceiptTypeSelect).toBeEnabled();
        expect(cashReceiptNumberInput).toBeEnabled();
      });
    });
  });

  describe('form validation 검사', () => {
    it('필수 필드가 비어있을 때 에러 메시지를 표시해야 한다', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(<OrderForm orderHistory={mockOrderHistory} />);

      const submitButton = screen.getByRole('button', { name: /주문하기/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('메시지를 입력해주세요.');
      });

      alertMock.mockRestore();
    });

    it('메시지가 100자를 초과할 때 에러 메시지를 표시해야 한다', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(<OrderForm orderHistory={mockOrderHistory} />);

      const messageInput = screen.getByRole('textbox', { name: /메시지/i });
      userEvent.type(messageInput, 'a'.repeat(101));

      const submitButton = screen.getByRole('button', { name: /주문하기/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
      });

      alertMock.mockRestore();
    });

    it('현금영수증을 선택했을 때 번호가 비어있으면 에러 메시지를 표시해야 한다', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(<OrderForm orderHistory={mockOrderHistory} />);

      const cashReceiptCheckbox = screen.getByRole('checkbox', { name: /현금영수증/i });
      userEvent.click(cashReceiptCheckbox);

      const messageInput = screen.getByRole('textbox', { name: /메시지/i });
      userEvent.type(messageInput, '테스트 메시지');

      const submitButton = screen.getByRole('button', { name: /주문하기/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
      });

      alertMock.mockRestore();
    });

    it('현금영수증 번호가 숫자가 아닐 때 에러 메시지를 표시해야 함', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(<OrderForm orderHistory={mockOrderHistory} />);

      const cashReceiptCheckbox = screen.getByRole('checkbox', { name: /현금영수증/i });
      userEvent.click(cashReceiptCheckbox);

      const cashReceiptNumberInput = screen.getByRole('textbox', { name: /현금영수증 번호/i });
      userEvent.type(cashReceiptNumberInput, 'abc123');

      const messageInput = screen.getByRole('textbox', { name: /메시지/i });
      userEvent.type(messageInput, '테스트 메시지');

      const submitButton = screen.getByRole('button', { name: /주문하기/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
      });

      alertMock.mockRestore();
    });

    it('모든 필드가 올바르게 입력되었을 때 주문 완료 메시지를 표시해야 한다', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {});

      render(<OrderForm orderHistory={mockOrderHistory} />);

      const messageInput = screen.getByRole('textbox', { name: /메시지/i });
      userEvent.type(messageInput, '테스트 메시지');

      const submitButton = screen.getByRole('button', { name: /주문하기/i });
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleMock).toHaveBeenCalledWith('values', expect.any(Object));
        expect(alertMock).toHaveBeenCalledWith('주문이 완료되었습니다.');
      });

      alertMock.mockRestore();
      consoleMock.mockRestore();
    });
  });
});
