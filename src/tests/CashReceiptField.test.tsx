import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { ChakraProvider } from '@chakra-ui/react';

const renderWithFormProvider = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  
  interface WrapperProps {
    children: ReactNode;
  }

  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const methods = useForm({
      defaultValues: {
        hasCashReceipt: false,
        cashReceiptType: '',
        cashReceiptNumber: '',
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <FormProvider {...methods}>
          <ChakraProvider>{children}</ChakraProvider>
        </FormProvider>
      </QueryClientProvider>
    );
  };

  return render(<Wrapper>{ui}</Wrapper>);
};

describe('CashReceiptFields', () => {
  test('체크박스 여부에 따른 입력필드 활성화여부 테스트', async () => {
    renderWithFormProvider(<CashReceiptFields />);

    const cashReceiptCheckbox = screen.getByLabelText(/현금영수증 신청/i);
    const cashReceiptType = screen.getByRole('combobox');
    const cashReceiptNumber = screen.getByPlaceholderText(/숫자만 입력해주세요/i);

    // 초기 상태: 비활성화 상태 확인
    await waitFor(() => {
      expect(cashReceiptCheckbox).not.toBeChecked();
      expect(cashReceiptType).toBeDisabled();
      expect(cashReceiptNumber).toBeDisabled();
    });

    // 체크박스 클릭
    fireEvent.click(cashReceiptCheckbox);

    // 체크 후 상태: 활성화 상태 확인
    await waitFor(() => {
      expect(cashReceiptCheckbox).toBeChecked();
      expect(cashReceiptType).not.toBeDisabled();
      expect(cashReceiptNumber).not.toBeDisabled();
    });

    // 체크박스 해제
    fireEvent.click(cashReceiptCheckbox);

    // 체크 해제 후 상태: 비활성화 상태 확인
    await waitFor(() => {
      expect(cashReceiptCheckbox).not.toBeChecked();
      expect(cashReceiptType).toBeDisabled();
      expect(cashReceiptNumber).toBeDisabled();
    });
  });
});
