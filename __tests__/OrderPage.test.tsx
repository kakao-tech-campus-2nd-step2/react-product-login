import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom/extend-expect';
import { OrderForm } from '@/components/features/Order/OrderForm';
import { OrderHistory } from '@/types';

const mockOrderHistory: OrderHistory = {
  id: 3245119,
  count: 1,
};

const queryClient = new QueryClient();

describe('OrderForm validation', () => {
  const renderOrderForm = (orderHistory = mockOrderHistory) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <OrderForm orderHistory={orderHistory} />
      </QueryClientProvider>,
    );
  };

  test('현금영수증 번호가 입력되지 않은 경우 에러 메시지가 나타난다', async () => {
    await act(async () => {
      renderOrderForm();

      const checkbox = screen.getByLabelText('현금영수증 신청');
      fireEvent.click(checkbox);
      fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
        target: { value: 'Test' },
      });

      window.alert = jest.fn();

      fireEvent.click(screen.getByLabelText('submitBtn'));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
      });
    });
  });

  test('현금영수증 번호가 숫자가 아닌 경우 에러 메시지가 나타난다', async () => {
    await act(async () => {
      renderOrderForm();

      const checkbox = screen.getByLabelText('현금영수증 신청');
      fireEvent.click(checkbox);
      fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
        target: { value: 'abcd' },
      });
      fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
        target: { value: 'Test' },
      });

      window.alert = jest.fn();

      fireEvent.click(screen.getByLabelText('submitBtn'));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
      });
    });
  });

  test('메시지 카드 텍스트가 입력되지 않은 경우 에러 메시지가 나타난다', async () => {
    await act(async () => {
      renderOrderForm();

      window.alert = jest.fn();

      fireEvent.click(screen.getByLabelText('submitBtn'));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
      });
    });
  });

  test('메시지 카드 텍스트가 100자를 초과한 경우 에러 메시지가 나타난다', async () => {
    await act(async () => {
      renderOrderForm();

      const longMessage = 'a'.repeat(101);
      fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
        target: { value: longMessage },
      });

      window.alert = jest.fn();

      fireEvent.click(screen.getByLabelText('submitBtn'));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
      });
    });
  });
});
