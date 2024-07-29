import { ReactElement, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { queryClient } from '@/api/config/queryClient';
import { OrderForm } from '@/pages/OrderPage/components/OrderForm';
import { OrderForm as OrderFormType } from '@/pages/OrderPage/hooks/useOrderForm';
import { OrderSchema, OrderValidationErrorMessages } from '@/schema/index';
import { OrderHistory } from '@/types/orderType';

const Form = ({ children }: { children: ReactNode }) => {
  const form = useForm<OrderFormType>({
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

const orderHistory: OrderHistory = {
  productId: 1,
  productQuantity: 1,
};

const errorMessage = OrderValidationErrorMessages;

describe('OrderForm을 제출했을 때 form field 유효성 검사', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  it('gitfMessage가 입력되지 않으면 에러 메세지를 보여준다. ', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    const giftMessageTextField = screen.getByTestId('gift-message-field');
    expect(giftMessageTextField).toBeInTheDocument();
    expect(giftMessageTextField).toHaveTextContent('');

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    const message = await screen.findByText(errorMessage.giftMessageRequired);
    expect(message).toBeInTheDocument();
  });

  it('gitfMessage가 100자가 넘어가면 에러 메세지를 보여준다. ', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    const giftMessageTextField = screen.getByTestId('gift-message-field');
    expect(giftMessageTextField).toBeInTheDocument();
    fireEvent.change(giftMessageTextField, {
      target: { value: 't'.repeat(101) },
    });

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    const message = await screen.findByText(errorMessage.giftMessageTooLong);
    expect(message).toBeInTheDocument();
  });

  it('현금 영수증을 체크하고 번호를 입력하지 않으면 에러 메세지를 보여준다. ', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    const giftMessageTextField = screen.getByTestId('gift-message-field');
    expect(giftMessageTextField).toBeInTheDocument();
    fireEvent.change(giftMessageTextField, {
      target: { value: 'test' },
    });

    const cashCheckedField = screen.getByTestId(
      'cash-checked-field'
    ) as HTMLInputElement;
    expect(cashCheckedField).toBeInTheDocument();
    fireEvent.click(cashCheckedField);
    expect(cashCheckedField.checked).toBe(true);

    const cashNumberField = screen.queryByTestId(
      'cash-number-field'
    ) as HTMLInputElement;
    expect(cashNumberField).toBeInTheDocument();
    expect(cashNumberField).toHaveTextContent('');

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    const message = await screen.findByText(
      errorMessage.cashReceiptNumberRequired
    );
    expect(message).toBeInTheDocument();
  });

  it('현금 영수증을 체크하고 - 없이 번호를 정확히 입력하지 않으면 에러 메세지를 보여준다. ', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    const giftMessageTextField = screen.getByTestId('gift-message-field');
    expect(giftMessageTextField).toBeInTheDocument();
    fireEvent.change(giftMessageTextField, {
      target: { value: 'test' },
    });

    const cashCheckedField = screen.getByTestId(
      'cash-checked-field'
    ) as HTMLInputElement;
    expect(cashCheckedField).toBeInTheDocument();
    fireEvent.click(cashCheckedField);
    expect(cashCheckedField.checked).toBe(true);

    const cashNumberField = screen.queryByTestId(
      'cash-number-field'
    ) as HTMLInputElement;
    expect(cashNumberField).toBeInTheDocument();
    fireEvent.change(cashNumberField, {
      target: { value: '010-1234-5678' },
    });

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    const message = await screen.findByText(
      errorMessage.cashReceiptNumberInvalid
    );
    expect(message).toBeInTheDocument();
  });
});
