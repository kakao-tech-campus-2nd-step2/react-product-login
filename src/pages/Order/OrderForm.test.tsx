import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';

//import { OrderForm } from '@/components/features/Order/OrderForm';
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

test('현금영수증 체크박스가 초기에는 체크되지 않으며, 관련 필드가 비활성화되어 있다.', async () => {
  await act(async () => {
    renderWithProviders(<CashReceiptFields />);
  });

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
  const cashReceiptSelect = screen.getByRole('combobox') as HTMLSelectElement;
  const cashReceiptInput = screen.getByPlaceholderText(
    '(-없이) 숫자만 입력해주세요.',
  ) as HTMLInputElement;

  expect(cashReceiptCheckbox.checked).toBe(false);
  expect(cashReceiptSelect).toBeDisabled();
  expect(cashReceiptInput).toBeDisabled();
});

test('현금영수증 Checkbox가 true인 경우 현금영수증 종류, 현금영수증 번호 field가 활성화되고, 값이 입력될 수 있다.', async () => {
  await act(async () => {
    renderWithProviders(<CashReceiptFields />);
  });

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
  const cashReceiptSelect = screen.getByRole('combobox') as HTMLSelectElement;
  const cashReceiptInput = screen.getByPlaceholderText(
    '(-없이) 숫자만 입력해주세요.',
  ) as HTMLInputElement;

  // 체크박스를 클릭하여 체크 상태로 만듦
  fireEvent.click(cashReceiptCheckbox);

  // 필드가 활성화되어야 함
  expect(cashReceiptCheckbox.checked).toBe(true);
  expect(cashReceiptSelect).toBeEnabled();
  expect(cashReceiptInput).toBeEnabled();

  // 필드에 값 입력 테스트
  fireEvent.change(cashReceiptSelect, { target: { value: 'BUSINESS' } });
  fireEvent.change(cashReceiptInput, { target: { value: '1234567890' } });

  expect(cashReceiptSelect.value).toBe('BUSINESS');
  expect(cashReceiptInput.value).toBe('1234567890');
});
