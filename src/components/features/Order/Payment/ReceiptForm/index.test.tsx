import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { OrderDataFormValues } from '@/pages/Order';
import ReceiptForm from '.';

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  const methods = useForm<OrderDataFormValues>({
    defaultValues: {
      message: '',
      hasCashReceipt: false,
      cashReceiptType: '개인소득공제',
      cashReceiptNumber: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

test('현금영수증 Checkbox가 체크되지 않은 경우 현금영수증 필드 렌더링 테스트 ', async () => {
  render(
    <ChakraProvider>
      <Wrapper>
        <ReceiptForm />
      </Wrapper>
    </ChakraProvider>,
  );

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  expect(cashReceiptCheckbox).not.toBeChecked();
  expect(screen.queryByPlaceholderText('(-없이) 숫자만 입력해주세요.')).not.toBeInTheDocument();
  expect(screen.queryByText('개인소득공제')).not.toBeInTheDocument();
  expect(screen.queryByText('사업자증빙용')).not.toBeInTheDocument();
});

test('현금영수증 Checkbox가 체크된 경우 현금영수증 필드 렌더링 테스트 ', async () => {
  render(
    <ChakraProvider>
      <Wrapper>
        <ReceiptForm />
      </Wrapper>
    </ChakraProvider>,
  );

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  fireEvent.click(cashReceiptCheckbox);

  await waitFor(() => {
    expect(cashReceiptCheckbox).toBeChecked();
    expect(screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.')).toBeInTheDocument();
    expect(screen.getByText('개인소득공제')).toBeInTheDocument();
    expect(screen.getByText('사업자증빙용')).toBeInTheDocument();
  });
});
