import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from './CashReceiptFields';

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

  test('Checkbox 상태에 따른 필드 활성화/비활성화 테스트', async () => {
    render(<TestComponent />);

    // 1. 초기 상태: 체크박스가 체크되지 않은 상태에서 필드들이 비활성화 되어 있는지 확인
    const cashReceiptTypeSelect = screen.getByRole('combobox', { name: 'cashReceiptType' });
    const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    expect(cashReceiptTypeSelect).toBeDisabled();
    expect(cashReceiptNumberInput).toBeDisabled();

    // 2. 체크박스 클릭: 체크박스를 클릭하여 필드들을 활성화
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(cashReceiptCheckbox);

    // 3. 필드 활성화 확인: 필드들이 활성화 되었는지 확인
    expect(cashReceiptTypeSelect).toBeEnabled();
    expect(cashReceiptNumberInput).toBeEnabled();
  });

  test('Checkbox가 true인 경우 필드 값 입력 테스트', async () => {
    const methods = useForm();
    render(
      <ChakraProvider>
        <FormProvider {...methods}>
          <CashReceiptFields />
        </FormProvider>
      </ChakraProvider>,
    );

    // 1. 체크박스 클릭
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(cashReceiptCheckbox);

    // 2. 필드 값 입력
    const cashReceiptTypeSelect = screen.getByRole('combobox', { name: 'cashReceiptType' });
    const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    fireEvent.change(cashReceiptTypeSelect, { target: { value: 'BUSINESS' } });
    fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

    // 3. 입력 값 확인
    expect(methods.getValues('cashReceiptType')).toBe('BUSINESS');
    expect(methods.getValues('cashReceiptNumber')).toBe('1234567890');
  });
});
