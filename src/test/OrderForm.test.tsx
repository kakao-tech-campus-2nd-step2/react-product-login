import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { OrderForm } from '@/components/features/Order/OrderForm';
import type { OrderFormData, OrderHistory } from '@/types';

const mockOrderHistory: OrderHistory = {
  id: 3245119,
  count: 2,
};

const queryClient = new QueryClient();

const { result } = renderHook(() =>
  useForm<OrderFormData>({
    defaultValues: {
      productId: 1,
      productQuantity: 1,
      messageCardTextMessage: '',
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptType: 'PERSONAL',
      cashReceiptNumber: '',
    },
  }),
);

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('OrderForm Validation', () => {
  test('error message for invalid cash receipt number', async () => {
    const methods = result.current;
    await act(async () => {
      render(
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <FormProvider {...methods}>
              <OrderForm orderHistory={mockOrderHistory} />/
            </FormProvider>
          </QueryClientProvider>
        </ChakraProvider>,
      );
    });
    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(checkbox);

    fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
      target: { value: 'aa' },
    });
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
    });
  });

  test('error message for missing cash receipt number', async () => {
    const methods = result.current;
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <OrderForm orderHistory={mockOrderHistory} />/
          </FormProvider>
        </QueryClientProvider>
      </ChakraProvider>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(checkbox);

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
        target: { value: '' },
      });
      fireEvent.submit(screen.getByRole('form'));
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });
  });

  test('error message for missing message card text', async () => {
    const methods = result.current;
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <OrderForm orderHistory={mockOrderHistory} />/
          </FormProvider>
        </QueryClientProvider>
      </ChakraProvider>,
    );
    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
      target: { value: '' },
    });
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });
  });

  test('error message for message card text too long', async () => {
    const methods = result.current;
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <OrderForm orderHistory={mockOrderHistory} />/
          </FormProvider>
        </QueryClientProvider>
      </ChakraProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
      target: { value: 'A'.repeat(101) },
    });
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
    });
  });

  test('submit the form successfully with valid data', async () => {
    const methods = result.current;
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <OrderForm orderHistory={mockOrderHistory} />/
          </FormProvider>
        </QueryClientProvider>
      </ChakraProvider>,
    );
    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(checkbox);

    fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
      target: { value: 'Valid message' },
    });
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
    });
  });
});
