// src\components\features\Order\OrderForm\index.test.tsx

import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider, useAuth } from '@/provider/Auth';

import { OrderForm } from './index'; // 결제하기 폼 컴포넌트 경로

const setupQueryClient = new QueryClient();

const customRender = (ui: React.ReactNode, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <QueryClientProvider client={setupQueryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={ui} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

// Mocking AuthProvider and useAuth
jest.mock('@/provider/Auth', () => ({
  ...jest.requireActual('@/provider/Auth'),
  useAuth: jest.fn(),
}));

describe('OrderForm Component Tests', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ id: 'testUser', name: 'testUser', token: 'testUser' });
  });

  test('현금영수증 Checkbox가 false인 경우 현금영수증 종류, 현금영수증 번호 field가 비활성화 되어있는지 확인', async () => {
    customRender(<OrderForm orderHistory={{ id: 1, count: 1 }} />);

    const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
    const cashReceiptType = screen.getByLabelText('현금영수증 종류');
    const cashReceiptNumber = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    expect(cashReceiptCheckbox).toBeInTheDocument();
    expect(cashReceiptType).toBeDisabled();
    expect(cashReceiptNumber).toBeDisabled();

    fireEvent.click(cashReceiptCheckbox);

    await waitFor(() => {
      expect(cashReceiptType).toBeEnabled();
      expect(cashReceiptNumber).toBeEnabled();
    });

    fireEvent.change(cashReceiptNumber, { target: { value: '010' } });

    await waitFor(() => {
      expect(cashReceiptNumber).toHaveValue('010');
    });
  });

  test('form의 validation 로직이 정상 동작하는지 확인하는 테스트', async () => {
    customRender(<OrderForm orderHistory={{ id: 1, count: 1 }} />);

    const submitBtn = screen.getByRole('button', { name: /결제하기/i });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('메시지를 입력해주세요.')).toBeInTheDocument();
    });

    const messageField = screen.getByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');

    fireEvent.change(messageField, { target: { value: '축하해요' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
    });
  });
});
