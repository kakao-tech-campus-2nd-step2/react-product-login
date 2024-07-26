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

    const cashReceiptCheckbox = screen.getByLabelText('현금 영수증');
    expect(cashReceiptCheckbox).toBeInTheDocument();

    const receiptTypeField = screen.queryByLabelText('현금영수증 종류');
    const receiptNumberField = screen.queryByLabelText('현금영수증 번호');

    expect(receiptTypeField).not.toBeInTheDocument();
    expect(receiptNumberField).not.toBeInTheDocument();

    fireEvent.click(cashReceiptCheckbox);

    expect(screen.getByLabelText('현금영수증 종류')).toBeInTheDocument();
    expect(screen.getByLabelText('현금영수증 번호')).toBeInTheDocument();
  });

  test('현금 영수증 체크박스가 true일 때 관련 필드가 필수로 입력되어야 한다', async () => {
    renderWithProviders(<OrderPage />);

    const cashReceiptCheckbox = screen.getByLabelText('현금 영수증');
    fireEvent.click(cashReceiptCheckbox);

    const receiptTypeField = screen.getByLabelText('현금영수증 종류');
    const receiptNumberField = screen.getByLabelText('현금영수증 번호');
    const submitButton = screen.getByRole('button', { name: /제출/i });

    fireEvent.change(receiptTypeField, { target: { value: '' } });
    fireEvent.change(receiptNumberField, { target: { value: '' } });

    fireEvent.click(submitButton);

    expect(await screen.findByText('현금영수증 번호를 입력해주세요.')).toBeInTheDocument();
    expect(await screen.findByText('현금영수증 번호는 숫자로만 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(receiptTypeField, { target: { value: '일반' } });
    fireEvent.change(receiptNumberField, { target: { value: '1234567890' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('현금영수증 번호를 입력해주세요.')).not.toBeInTheDocument();
      expect(
        screen.queryByText('현금영수증 번호는 숫자로만 입력해주세요.'),
      ).not.toBeInTheDocument();
    });
  });
});
