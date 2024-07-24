import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WrapperComponent = () => {
  const methods = useForm({
    defaultValues: {
      hasCashReceipt: false,
      cashReceiptType: '',
      cashReceiptNumber: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <CashReceiptFields />
    </FormProvider>
  );
};

describe('CashReceiptFields', () => {
  const renderWithCashReceiptFields = () => {
    return render(<WrapperComponent />);
  };

  test('현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인', () => {
    renderWithCashReceiptFields();
    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    const cashReceiptType = screen.getByRole('combobox'); // Select 요소는 role이 combobox
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(cashReceiptCheckbox).not.toBeChecked();

    expect(cashReceiptType).toBeEnabled();
    expect(cashReceiptNumber).toBeEnabled();
  });

  test('현금영수증 Checkbox가 true인 경우 현금영수증 종류, 현금영수증 번호 field가 활성화 되어있는지 확인', () => {
    renderWithCashReceiptFields();

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(cashReceiptCheckbox);

    const cashReceiptType = screen.getByRole('combobox');
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(cashReceiptCheckbox).toBeChecked();

    // `Select` 요소가 활성화 상태인지 확인
    expect(cashReceiptType).not.toBeDisabled();

    // `Input` 요소가 활성화 상태인지 확인
    expect(cashReceiptNumber).not.toBeDisabled();
  });

  test('현금영수증 번호를 입력한 경우 입력된 값이 올바르게 반영되는지 확인', () => {
    renderWithCashReceiptFields();

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(cashReceiptCheckbox);

    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
    fireEvent.change(cashReceiptNumber, { target: { value: '1234567890' } });

    expect(cashReceiptNumber).toHaveValue('1234567890');
  });
});
