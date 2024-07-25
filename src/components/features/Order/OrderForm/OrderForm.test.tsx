import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { CashReceiptFields } from './Fields/CashReceiptFields';  // 해당 컴포넌트의 경로에 맞게 수정하세요

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const methods = useForm();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <FormProvider {...methods}>
          {children}
        </FormProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<TestWrapper>{ui}</TestWrapper>);
};

test('현금영수증 신청 체크박스 체크 여부에 따라 현금영수증 필드 활성화/비활성화 확인', async () => {
  renderWithProviders(<CashReceiptFields />);

  const checkbox = await screen.findByLabelText(/현금영수증 신청/i);
  const typeSelect = await screen.findByLabelText(/현금영수증 종류/i);
  const numberInput = await screen.findByPlaceholderText("(-없이) 숫자만 입력해주세요.");

  expect(checkbox).not.toBeChecked();
  
  expect(typeSelect).toHaveAttribute('disabled');
  expect(numberInput).toHaveAttribute('disabled');

  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(checkbox).toBeChecked();

    expect(typeSelect).not.toHaveAttribute('disabled');
    expect(numberInput).not.toHaveAttribute('disabled');
  });

  fireEvent.click(checkbox);

  await waitFor(() => {
    expect(checkbox).not.toBeChecked();

    expect(typeSelect).toHaveAttribute('disabled');
    expect(numberInput).toHaveAttribute('disabled');
  });
});
