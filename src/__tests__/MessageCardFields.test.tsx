import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { queryClient } from '@/api/instance';
import { OrderForm } from '@/components/features/Order/OrderForm';
import type { OrderHistory } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WrapperComponent = ({ orderHistory }: { orderHistory: OrderHistory }) => {
  const methods = useForm({
    defaultValues: {
      productId: orderHistory.id,
      productQuantity: orderHistory.count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>
        <OrderForm orderHistory={orderHistory} />
      </FormProvider>
    </QueryClientProvider>
  );
};

// Mock data
const orderHistory: OrderHistory = { id: 3245119, count: 1 };

describe('OrderForm', () => {
  test('should show error message when messageCardTextMessage exceeds 100 characters', () => {
    render(<WrapperComponent orderHistory={orderHistory} />);

    const textarea = screen.getByPlaceholderText(
      /선물과 함께 보낼 메시지를 적어보세요/i,
    ) as HTMLTextAreaElement;

    // Simulate entering more than 100 characters
    fireEvent.change(textarea, { target: { value: 'a'.repeat(101) } });

    // Trigger form validation
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Check if validation error message is shown
    expect(screen.getByText(/메시지는 100자 이내로 입력해주세요./i)).toBeInTheDocument();
  });
});
