import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from './CashReceiptFields';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

test('현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인', () => {
  render(
    <Wrapper>
      <CashReceiptFields />
    </Wrapper>,
  );

  const checkbox = screen.getByLabelText('현금영수증 신청');
  const select = screen.getByRole('combobox');
  const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

  expect(select).toBeDisabled();
  expect(input).toBeDisabled();

  fireEvent.click(checkbox);

  expect(select).toBeEnabled();
  expect(input).toBeEnabled();

  fireEvent.click(checkbox);

  expect(select).toBeDisabled();
  expect(input).toBeDisabled();
});
