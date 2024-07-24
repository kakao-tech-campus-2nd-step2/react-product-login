import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { server } from '@/mocks/server';
import { OrderPage } from '@/pages/Order';
import { orderHistorySessionStorage } from '@/utils/storage';

// Mock 서버 설정
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

// Mock order history 설정
const product = PRODUCTS_MOCK_DATA.content[0];
orderHistorySessionStorage.set({ id: product.id, count: 1 });

describe('OrderForm 컴포넌트', () => {
  it('현금영수증 체크박스 상태에 따라 필드 활성화 상태를 확인해야 합니다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <OrderPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    // 현금영수증 신청 체크박스, 종류 선택, 번호 입력 필드를 찾습니다.
    const checkbox = await screen.findByLabelText('현금영수증 신청');
    const typeSelect = await screen.findByLabelText('현금영수증 종류'); // Label을 사용하여 찾습니다.
    const numberInput = await screen.findByPlaceholderText('(-없이) 숫자만 입력해주세요.');

    // 초기 상태 체크
    expect(checkbox).not.toBeChecked();
    expect(typeSelect).toBeDisabled();
    expect(numberInput).toBeDisabled();

    // 체크박스 클릭
    fireEvent.click(checkbox);

    // 체크 후 상태 체크
    await waitFor(() => {
      expect(checkbox).toBeChecked();
      expect(typeSelect).not.toBeDisabled();
      expect(numberInput).not.toBeDisabled();
    });

    // 다시 체크박스 클릭
    fireEvent.click(checkbox);

    // 체크 해제 후 상태 체크
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
      expect(typeSelect).toBeDisabled();
      expect(numberInput).toBeDisabled();
    });
  });

  it('폼 유효성 검사 테스트', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <OrderPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const submitButton = await screen.findByRole('button', {
      name: `${product.price * 1}원 결제하기`,
    });
    const messageTextarea =
      await screen.findByPlaceholderText('선물과 함께 보낼 메시지를 적어보세요');

    // 메시지 없이 폼 제출 시도
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('메시지를 입력해주세요.')).toBeInTheDocument();
    });

    // 메시지 입력 후 폼 제출 시도
    fireEvent.change(messageTextarea, { target: { value: '생일 축하해!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('메시지를 입력해주세요.')).not.toBeInTheDocument();
      expect(screen.getByText('주문이 완료되었습니다.')).toBeInTheDocument();
    });
  });
});
