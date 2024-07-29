import { ReactElement, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { queryClient } from '@/api/config/queryClient';
import { CashCheckFields } from '@/pages/OrderPage/components/OrderForm/PaymentSection/CashCheckFields';
import { OrderForm } from '@/pages/OrderPage/hooks/useOrderForm';
import { OrderSchema } from '@/schema/index';

const Form = ({ children }: { children: ReactNode }) => {
  const form = useForm<OrderForm>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      gitfMessage: '',
      isCashChecked: false,
      cashReceiptNumber: '',
    },
  });

  return <FormProvider {...form}>{children} </FormProvider>;
};

const renderWithProviders = (ui: ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Form>{ui}</Form>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

describe('OrderForm의 현금 영수증 여부에 따른 테스트', () => {
  test('현금영수증 Checkbox가 false인 경우, 현금영수증 종류와 번호 field 비활성화 여부 확인', async () => {
    renderWithProviders(<CashCheckFields />);

    const cashReceiptCheckbox = screen.getByRole('checkbox');
    expect(cashReceiptCheckbox).toBeInTheDocument();
    expect(cashReceiptCheckbox).not.toBeChecked();

    const cashReceiptType = screen.getByRole('combobox');
    expect(cashReceiptType).toBeInTheDocument();
    expect(cashReceiptType).toBeDisabled();

    const cashReceiptNumber = screen.getByRole('textbox');
    expect(cashReceiptNumber).toBeInTheDocument();
    expect(cashReceiptNumber).toBeDisabled();
  });

  test('현금영수증 Checkbox가 true인 경우, 현금영수증 종류와 번호 field 활성화 여부 확인', async () => {
    renderWithProviders(<CashCheckFields />);

    const cashReceiptCheckbox = screen.getByRole('checkbox');
    expect(cashReceiptCheckbox).toBeInTheDocument();
    fireEvent.click(cashReceiptCheckbox);
    expect(cashReceiptCheckbox).toBeChecked();

    const cashReceiptType = screen.getByRole('combobox');
    expect(cashReceiptType).toBeInTheDocument();
    expect(cashReceiptType).toBeEnabled();

    const cashReceiptNumber = screen.getByRole('textbox');
    expect(cashReceiptNumber).toBeInTheDocument();
    expect(cashReceiptNumber).toBeEnabled();
  });
});
