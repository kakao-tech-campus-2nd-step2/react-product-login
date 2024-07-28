import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';

import { OrderForm } from '@/components/features/Order/OrderForm';
import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';
import type { OrderFormData } from '@/types';

const queryClient = new QueryClient();

const orderHistory = {
  id: 1,
  count: 1,
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Wrapper>{ui}</Wrapper>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: orderHistory.id,
      productQuantity: orderHistory.count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptType: 'PERSONAL',
      cashReceiptNumber: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

beforeEach(() => {
  global.alert = jest.fn();
});

describe('현금영수증 Checkbox 테스트', () => {
  beforeEach(() => {
    renderWithProviders(<CashReceiptFields />);
  });

  it('체크박스가 체크되지 않았을 때 현금영수증 유형 및 번호 입력 필드가 비활성화되어야 함', async () => {
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    const cashReceiptTypeInput = screen.getByRole('combobox') as HTMLSelectElement;
    const cashReceiptNumberInput = screen.getByPlaceholderText(
      '(-없이) 숫자만 입력해주세요.',
    ) as HTMLInputElement;

    expect(cashReceiptCheckbox.checked).toBe(false);
    expect(cashReceiptNumberInput).toBeDisabled();
    expect(cashReceiptTypeInput).toBeDisabled();
  });

  it('체크박스가 체크되었을 때 현금영수증 유형 및 번호 입력 필드가 활성화되어야 함', async () => {
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;

    await userEvent.click(cashReceiptCheckbox);

    const cashReceiptTypeInput = screen.getByRole('combobox') as HTMLSelectElement;
    const cashReceiptNumberInput = screen.getByPlaceholderText(
      '(-없이) 숫자만 입력해주세요.',
    ) as HTMLInputElement;

    expect(cashReceiptCheckbox.checked).toBe(true);
    expect(cashReceiptNumberInput).toBeEnabled();
    expect(cashReceiptTypeInput).toBeEnabled();
  });
});

describe('form의 validation 테스트', () => {
  beforeEach(() => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);
  });

  it('현금영수증 번호를 입력하지 않으면 에러 메시지가 표시된다.', async () => {
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    await userEvent.click(cashReceiptCheckbox);
    const submitButton = screen.getByTestId('payment-button');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });
  });

  it('현금영수증 번호에 숫자가 아닌 값을 입력하면 에러 메시지가 표시된다.', async () => {
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    await userEvent.click(cashReceiptCheckbox);
    const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    await userEvent.type(cashReceiptNumberInput, 'abcd');

    const submitButton = screen.getByTestId('payment-button');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
    });
  });

  it('메시지를 입력하지 않으면 에러 메시지가 표시된다.', async () => {
    const submitButton = screen.getByTestId('payment-button');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });
  });

  it('메시지가 100자를 초과하면 에러 메시지가 표시된다.', async () => {
    const messageInput = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');
    await userEvent.type(messageInput, 'a'.repeat(101));

    const submitButton = screen.getByTestId('payment-button');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
    });
  });
});
