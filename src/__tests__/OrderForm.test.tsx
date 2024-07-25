import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';

import { OrderForm } from '@/components/features/Order/OrderForm';
import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';
import type { OrderFormData } from '@/types';

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
        <BrowserRouter>
          <FormWrapper>{ui}</FormWrapper>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>,
  );
};

beforeAll(() => {
  window.alert = jest.fn();
});

test('현금영수증 Checkbox 상태에 따라 필드 활성화/비활성화 테스트', async () => {
  // 처음에는 Checkbox가 비활성화 상태로 시작합니다.
  await act(async () => {
    renderWithProviders(<CashReceiptFields />);
  });

  // 초기 상태 검사
  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
  const cashReceiptSelect = screen.getByRole('combobox') as HTMLSelectElement;
  const cashReceiptInput = screen.getByPlaceholderText(
    '(-없이) 숫자만 입력해주세요.',
  ) as HTMLInputElement;

  // Checkbox가 비활성화 상태일 때 필드가 비활성화되어 있는지 확인
  expect(cashReceiptCheckbox.checked).toBe(false);
  expect(cashReceiptSelect).toBeDisabled();
  expect(cashReceiptInput).toBeDisabled();

  // Checkbox 클릭하여 상태 변경
  fireEvent.click(cashReceiptCheckbox);

  // Checkbox가 활성화 상태일 때 필드가 활성화되어 있는지 확인
  expect(cashReceiptCheckbox.checked).toBe(true);
  expect(cashReceiptSelect).toBeEnabled();
  expect(cashReceiptInput).toBeEnabled();
});

// form의 validation 정상 동작 확인
test('현금영수증 신청했을 때 번호를 입력하지 않을 시에 에러 메시지 표시', async () => {
  await act(async () => {
    renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);
  });

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;

  fireEvent.click(cashReceiptCheckbox);

  fireEvent.submit(screen.getByRole('form'));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
  });
});

test('현금영수증 번호에 숫자가 아닌 값을 입력하면 에러 메시지 표시', async () => {
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

test('메시지를 입력하지 않으면 에러 메시지 표시', async () => {
  renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);

  fireEvent.submit(screen.getByRole('form'));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
  });
});

test('메시지가 100자를 초과하면 에러 메시지 표시', async () => {
  renderWithProviders(<OrderForm orderHistory={{ id: 1, count: 1 }} />);

  fireEvent.change(screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요'), {
    target: { value: 'b'.repeat(101) },
  });

  fireEvent.submit(screen.getByRole('form'));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
  });
});
