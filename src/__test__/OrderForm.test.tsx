import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom/extend-expect';

import { OrderForm } from '@/components/features/Order/OrderForm';
import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';
import type { OrderFormData } from '@/types';
import { AuthProvider } from '@/provider/Auth';

const queryClient = new QueryClient();

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OrderFormData>({
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
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FormWrapper>{ui}</FormWrapper>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

beforeAll(() => {
  window.alert = jest.fn();
});

describe('OrderForm Component Tests', () => {
  test('Cash receipt fields are enabled/disabled based on checkbox state', async () => {
    await act(async () => {
      renderWithProviders(<CashReceiptFields />);
    });

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    const cashReceiptSelect = screen.getByRole('combobox') as HTMLSelectElement;
    const cashReceiptInput = screen.getByPlaceholderText(
      '(-없이) 숫자만 입력해주세요.',
    ) as HTMLInputElement;

    // Initial state check
    expect(cashReceiptCheckbox.checked).toBe(false);
    expect(cashReceiptSelect).toHaveAttribute('disabled');
    expect(cashReceiptInput).toBeDisabled();

    // Toggle checkbox to enable fields
    fireEvent.click(cashReceiptCheckbox);

    expect(cashReceiptCheckbox.checked).toBe(true);
    expect(cashReceiptSelect).toBeEnabled();
    expect(cashReceiptInput).toBeEnabled();
  });

  test('Displays error message when cash receipt number is missing', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);
    });

    fireEvent.click(screen.getByLabelText('현금영수증 신청') as HTMLInputElement);
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });
  });

  test('Displays error message when cash receipt number is non-numeric', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);
    });

    fireEvent.click(screen.getByLabelText('현금영수증 신청'));
    fireEvent.change(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.'), {
      target: { value: 'test' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
    });
  });

  test('Displays error message when message is empty', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });
  });

  test('Displays error message when message exceeds 100 characters', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);
    });

    fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
      target: { value: 'b'.repeat(101) },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
    });
  });

  test('Prevents form submission on Enter key press', () => {
    renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);

    const form = screen.getByRole('form');

    fireEvent.keyDown(form, { key: 'Enter', code: 'Enter', charCode: 13 });

    // You might need to check for specific implementation details here
  });
});
