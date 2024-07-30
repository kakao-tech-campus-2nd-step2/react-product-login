import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useForm, FormProvider } from 'react-hook-form';
import { CashReceiptFields } from '@/components/features/Order/OrderForm/Fields/CashReceiptFields';

const FormWrapper = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <CashReceiptFields />
    </FormProvider>
  );
};

describe('CashReceiptFields', () => {
  test('현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화', () => {
    render(<FormWrapper />);

    const checkbox = screen.getByLabelText('현금영수증 신청');
    const selectField = screen.getByRole('combobox');
    const inputField = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(checkbox).not.toBeChecked();
    expect(selectField).toBeDisabled();
    expect(inputField).toBeDisabled();
  });

  test('만약 true인 경우 현금영수증 종류, 번호 field에 값이 입력 되어야 한다.', () => {
    render(<FormWrapper />);

    const checkbox = screen.getByLabelText('현금영수증 신청');
    fireEvent.click(checkbox);

    const selectField = screen.getByRole('combobox');
    const inputField = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(checkbox).toBeChecked();
    expect(selectField).not.toHaveAttribute('aria-disabled');
    expect(inputField).not.toBeDisabled();
  });
});
