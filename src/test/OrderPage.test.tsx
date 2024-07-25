import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';
import type { OrderFormData } from '@/types';

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

test('should disable cash receipt fields when checkbox is unchecked', async () => {
  const methods = result.current;
  await act(async () => {
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <CashReceiptFields />
          </FormProvider>
        </QueryClientProvider>
      </ChakraProvider>,
    );
  });
  const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  const cashReceiptType = screen.getByRole('combobox') as HTMLSelectElement;
  const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;

  expect(cashReceiptType.disabled).toBe(true);
  expect(cashReceiptNumber.disabled).toBe(true);
});

test('should enable cash receipt fields when checkbox is checked', async () => {
  const methods = result.current;
  await act(async () => {
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <CashReceiptFields />
          </FormProvider>
        </QueryClientProvider>
      </ChakraProvider>,
    );
  });
  const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(checkbox.checked).toBe(true);

    const cashReceiptType = screen.getByRole('combobox') as HTMLSelectElement;
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();
  });
});
