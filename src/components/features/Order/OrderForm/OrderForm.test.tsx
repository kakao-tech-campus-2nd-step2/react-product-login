import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { OrderForm } from '.';
import { CashReceiptFields } from './Fields/CashReceiptFields';

const mockOrderHistory = {
  id: 1,
  count: 2,
};

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

test('폼 검증 로직이 올바르게 동작하는지 확인', async () => {
  renderWithProviders(<OrderForm orderHistory={mockOrderHistory} />);

  const cashReceiptCheckbox = await screen.findByLabelText(/현금영수증 신청/i);
  const cashReceiptNumberInput = await screen.findByPlaceholderText(/숫자만 입력해주세요/i);
  const messageInput = await screen.findByLabelText(/메시지를 입력해주세요/i);
  const submitButton = await screen.findByText(/주문이 완료되었습니다./i);

  fireEvent.click(cashReceiptCheckbox);
  fireEvent.click(submitButton);
  expect(await screen.findByText('현금영수증 번호를 입력해주세요.')).toBeInTheDocument();

  fireEvent.change(cashReceiptNumberInput, { target: { value: 'number' } });
  fireEvent.click(submitButton);
  expect(await screen.findByText('현금영수증 번호는 숫자로만 입력해주세요.')).toBeInTheDocument();

  fireEvent.change(cashReceiptNumberInput, { target: { value: '01012345678' } });
  fireEvent.click(submitButton);
  expect(await screen.findByText('메시지를 입력해주세요.')).toBeInTheDocument();

  fireEvent.change(messageInput, { target: { value: '메세지'.repeat(101) } });
  fireEvent.click(submitButton);
  expect(await screen.findByText('메시지는 100자 이내로 입력해주세요.')).toBeInTheDocument();

  fireEvent.change(messageInput, { target: { value: '가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가' } });
  fireEvent.click(submitButton);
  expect(screen.queryByText('현금영수증 번호를 입력해주세요.')).not.toBeInTheDocument();
  expect(screen.queryByText('현금영수증 번호는 숫자로만 입력해주세요.')).not.toBeInTheDocument();
  expect(screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
  expect(screen.queryByText('메시지는 100자 이내로 입력해주세요.')).not.toBeInTheDocument();
});