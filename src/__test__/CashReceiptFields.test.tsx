import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';

describe('CashReceiptFields', () => {
  const TestComponent = () => {
    const methods = useForm();

    return (
      <ChakraProvider>
        <FormProvider {...methods}>
          <CashReceiptFields />
        </FormProvider>
      </ChakraProvider>
    );
  };

  test('체크박스 상태에 따라 입력 필드가 활성화/비활성화 되는지 확인', async () => {
    render(<TestComponent />);

    // 필드들이 처음에는 비활성화 상태인지 확인
    const cashReceiptTypeSelect = screen.getByLabelText('현금영수증 종류') as HTMLSelectElement;
    const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;
    expect(cashReceiptTypeSelect).toBeDisabled();
    expect(cashReceiptNumberInput).toBeDisabled();

    // 체크박스를 클릭하여 필드들을 활성화
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(cashReceiptCheckbox);

    // 필드들이 활성화 되었는지 확인
    expect(cashReceiptTypeSelect).toBeEnabled();
    expect(cashReceiptNumberInput).toBeEnabled();
  });


  test('체크박스가 활성화된 경우 입력 필드에 값이 올바르게 입력되는지 확인', async () => {
    render(<TestComponent />);

    // 체크박스를 클릭하여 필드들을 활성화
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    fireEvent.click(cashReceiptCheckbox);

    // 필드들에 값을 입력하고 올바르게 반영되는지 확인
    const cashReceiptTypeSelect = screen.getByLabelText('현금영수증 종류') as HTMLSelectElement;
    const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;
    fireEvent.change(cashReceiptTypeSelect, { target: { value: 'BUSINESS' } });
    fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

    // 입력된 값이 올바른지 확인
    expect(cashReceiptTypeSelect.value).toBe('BUSINESS');
    expect(cashReceiptNumberInput.value).toBe('1234567890');
  });
});
