import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { OrderFormData } from '@/types';
import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';
import { server } from '../mocks/server';

const queryClient = new QueryClient();

const FormWrapper: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: 1,
      productQuantity: 1,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>
    </QueryClientProvider>
  );
};

const renderWithFormProvider = (ui: React.ReactElement) => {
  return render(<FormWrapper>{ui}</FormWrapper>);
};

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('OrderForm 테스트', () => {
  test('현금영수증 체크박스가 false인 경우 현금영수증 종류, 번호 필드가 비활성화 되어있는지 확인', async () => {
    await act(async () => {
      renderWithFormProvider(<CashReceiptFields />);
    });

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 여부') as HTMLInputElement;
    const cashReceiptType = screen.getByLabelText('현금영수증 종류') as HTMLSelectElement;
    const cashReceiptNumberInput = screen.getByPlaceholderText(
      '(-없이) 숫자만 입력해주세요.',
    ) as HTMLInputElement;

    expect(cashReceiptCheckbox.checked).toBe(false);
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumberInput).toBeDisabled();
  });

  test('현금영수증 체크박스가 true인 경우 현금영수증 종류, 번호 필드가 활성화 되어있는지 확인', async () => {
    await act(async () => {
      renderWithFormProvider(<CashReceiptFields />);
    });

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 여부') as HTMLInputElement;
    const cashReceiptType = screen.getByLabelText('현금영수증 종류') as HTMLSelectElement;
    const cashReceiptNumberInput = screen.getByPlaceholderText(
      '(-없이) 숫자만 입력해주세요.',
    ) as HTMLInputElement;

    fireEvent.click(cashReceiptCheckbox);

    expect(cashReceiptCheckbox).toBe(true);
    expect(cashReceiptType).not.toBeDisabled();
    expect(cashReceiptNumberInput).not.toBeDisabled();
    expect(cashReceiptCheckbox).toBeChecked();
  });

  test('현금영수증 번호 필드의 validation 확인', async () => {
    await act(async () => {
      renderWithFormProvider(<CashReceiptFields />);
    });

    const cashReceiptNumberInput = screen.getByPlaceholderText(
      '(-없이) 숫자만 입력해주세요.',
    ) as HTMLInputElement;

    fireEvent.change(cashReceiptNumberInput, { target: { value: 'abc' } });

    await waitFor(() => {
      expect(screen.getByText('유효한 번호를 입력해주세요.')).toBeInTheDocument();
    });

    fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

    await waitFor(() => {
      expect(screen.queryByText('유효한 번호를 입력해주세요.')).not.toBeInTheDocument();
    });
  });

  test('현금영수증 종류 필드의 validation 확인', async () => {
    await act(async () => {
      renderWithFormProvider(<CashReceiptFields />);
    });

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 여부') as HTMLInputElement;
    fireEvent.click(cashReceiptCheckbox);

    const cashReceiptType = screen.getByLabelText('현금영수증 종류') as HTMLSelectElement;

    fireEvent.change(cashReceiptType, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText('현금영수증 종류를 선택해주세요.')).toBeInTheDocument();
    });

    fireEvent.change(cashReceiptType, { target: { value: '소득공제' } });

    await waitFor(() => {
      expect(screen.queryByText('현금영수증 종류를 선택해주세요.')).not.toBeInTheDocument();
    });
  });
});
