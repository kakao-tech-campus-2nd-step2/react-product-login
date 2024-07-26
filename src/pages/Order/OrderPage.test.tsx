import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useHandleOrderHistory } from '@/hooks/useHandleOrderHistory';

import { OrderPage } from './index';

jest.mock('@/hooks/useHandleOrderHistory', () => ({
  useHandleOrderHistory: jest.fn(),
}));

const createQueryClient = () => new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/order']}>
        <Routes>
          <Route path="/order" element={ui} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

const mockOrderHistory = {
  id: '12345',
  count: 1,
};

describe('OrderPage', () => {
  beforeEach(() => {
    (useHandleOrderHistory as jest.Mock).mockReturnValue({
      orderHistory: mockOrderHistory,
    });
  });

  test('현금 영수증 체크박스가 false일 때 관련 필드가 비활성화되어야 한다', async () => {
    renderWithProviders(<OrderPage />);

    const cashReceiptCheckbox = await screen.findByRole('checkbox', { name: /현금영수증 신청/i });
    expect(cashReceiptCheckbox).toBeInTheDocument();
    expect(cashReceiptCheckbox).not.toBeChecked();

    const receiptTypeField = screen.queryByRole('combobox');
    const receiptNumberField = screen.queryByPlaceholderText(/-없이 숫자만 입력해주세요./i);

    expect(receiptTypeField).not.toBeInTheDocument();
    expect(receiptNumberField).not.toBeInTheDocument();
  });

  test('현금 영수증 체크박스가 true일 때 필수 입력 필드가 제대로 검증되어야 한다', async () => {
    renderWithProviders(<OrderPage />);

    const cashReceiptCheckbox = await screen.findByRole('checkbox', { name: /현금영수증 신청/i });
    fireEvent.click(cashReceiptCheckbox);
    expect(cashReceiptCheckbox).toBeChecked();

    const receiptTypeField = await screen.findByRole('combobox');
    const receiptNumberField = await screen.findByPlaceholderText(/-없이 숫자만 입력해주세요./i);

    expect(receiptTypeField).toBeInTheDocument();
    expect(receiptNumberField).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: `${mockOrderHistory.count * 12345}원 결제하기`,
    });

    fireEvent.change(receiptNumberField, { target: { value: '' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('현금영수증 번호를 입력해주세요.')).toBeInTheDocument();
    expect(await screen.findByText('현금영수증 번호는 숫자로만 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(receiptNumberField, { target: { value: '1234567890' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('현금영수증 번호를 입력해주세요.')).not.toBeInTheDocument();
      expect(
        screen.queryByText('현금영수증 번호는 숫자로만 입력해주세요.'),
      ).not.toBeInTheDocument();
    });
  });

  test('메시지 카드 텍스트 유효성 검사', async () => {
    renderWithProviders(<OrderPage />);

    const cashReceiptCheckbox = await screen.findByRole('checkbox', { name: /현금영수증 신청/i });
    fireEvent.click(cashReceiptCheckbox);
    expect(cashReceiptCheckbox).toBeChecked();

    const messageCardField =
      await screen.findByPlaceholderText(/선물과 함께 보낼 메시지를 적어보세요/i);
    const submitButton = screen.getByRole('button', {
      name: `${mockOrderHistory.count * 12345}원 결제하기`,
    });

    fireEvent.change(messageCardField, { target: { value: '' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('메시지를 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(messageCardField, { target: { value: 'a'.repeat(101) } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('메시지는 100자 이내로 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(messageCardField, { target: { value: 'Valid message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
      expect(screen.queryByText('메시지는 100자 이내로 입력해주세요.')).not.toBeInTheDocument();
    });
  });
});
