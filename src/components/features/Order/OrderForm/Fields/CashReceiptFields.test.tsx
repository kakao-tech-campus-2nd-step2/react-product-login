import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from './CashReceiptFields';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const methods = useForm({
    defaultValues: {
      hasCashReceipt: false,
      cashReceiptType: '',
      cashReceiptNumber: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CashReceiptFields', () => {
  test('현금 영수증 O: CashReceiptFields 활성화', () => {
    render(
      <Wrapper>
        <CashReceiptFields />
      </Wrapper>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;

    expect(select.disabled).toBe(true);
    expect(input.disabled).toBe(true);

    fireEvent.click(checkbox);
    expect(select.disabled).toBe(false);
    expect(input.disabled).toBe(false);
  });

  test('현금 영수증 X: CashReceiptFields 비활성화', () => {
    render(
      <Wrapper>
        <CashReceiptFields />
      </Wrapper>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;

    fireEvent.click(checkbox);

    fireEvent.click(checkbox);
    expect(select.disabled).toBe(true);
    expect(input.disabled).toBe(true);
  });

  test('현금 영수증 O: 값 입력되었는지 확인', () => {
    render(
      <Wrapper>
        <CashReceiptFields />
      </Wrapper>,
    );

    const checkbox = screen.getByLabelText('현금영수증 신청') as HTMLInputElement;
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const input = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;

    fireEvent.click(checkbox);

    fireEvent.change(select, { target: { value: 'PERSONAL' } });
    fireEvent.change(input, { target: { value: '1234567890' } });

    expect(select.value).toBe('PERSONAL');
    expect(input.value).toBe('1234567890');
  });
});
