import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from './CashReceiptFields';

interface TestWrapperProps {
  children: React.ReactNode;
}

//React Hook Form 테스트를 위한 wrapper
const TestWrapper = ({ children }: TestWrapperProps) => {
  const fields = useForm({
    defaultValues: {
      hasCashReceipt: false,
      cashReceiptType: '',
      cashReceiptNumber: '',
    },
  });

  return <FormProvider {...fields}>{children}</FormProvider>;
};

test('Checkbox에 따라 현금영수증 종류와 번호 활성화 or 비활성화 확인', () => {
  render(
    <TestWrapper>
      <CashReceiptFields />
    </TestWrapper>,
  );

  const checkbox = screen.getByLabelText('현금영수증 신청');
  const cashReceiptType = screen.getByRole('combobox', { name: 'cashReceiptType' });
  const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

  //체크박스 초기 값: notChecked
  expect(checkbox).not.toBeChecked();

  //현금영수증 종류 비활성화
  expect(cashReceiptType).toBeDisabled();

  //현금영수증 번호 비활성화
  expect(cashReceiptNumber).toBeDisabled();

  //체크박스를 클릭하면
  fireEvent.click(checkbox);

  //현금영수증 종류 활성화
  expect(cashReceiptType).toBeEnabled();

  //현금영수증 번호 활성화
  expect(cashReceiptNumber).toBeEnabled();
});
