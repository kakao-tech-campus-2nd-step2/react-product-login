import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from './CashReceiptFields';

const TestProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CashReceiptFields Component', () => {
  test('현금영수증 Checkbox가 비활성화 되면 관련 필드도 비활성화 되어야 한다', () => {
    render(
      <TestProvider>
        <CashReceiptFields />
      </TestProvider>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청');
    const select = screen.getByRole('combobox');
    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(checkbox).not.toBeChecked();

    expect(select).toBeDisabled();
    expect(input).toBeDisabled();

    fireEvent.click(checkbox);

    expect(select).not.toBeDisabled();
    expect(input).not.toBeDisabled();
  });
});
