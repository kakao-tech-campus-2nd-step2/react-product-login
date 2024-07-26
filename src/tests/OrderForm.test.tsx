import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { OrderForm } from '@/components/features/Order/OrderForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { OrderHistory } from '@/types';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{ui}</ChakraProvider>
    </QueryClientProvider>
  );
};

describe('OrderForm validation', () => {
  const orderHistory: OrderHistory = { id: 3245119, count: 1 };

  test('현금영수증 번호 누락 시 경고문구출력', async () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    
    // 현금영수증 신청 체크박스 클릭
    fireEvent.click(screen.getByLabelText(/현금영수증 신청/i));

    // 현금영수증 번호를 입력하지 않고 폼 제출
    fireEvent.click(screen.getByText(/결제하기/i));

    // 경고 문구 확인
    expect(await screen.findByText('현금영수증 번호를 입력해주세요.')).toBeInTheDocument();
  });

  test('현금영수증 번호가 숫자가 아닐 시 경고출력', async () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    
    // 현금영수증 신청 체크박스 클릭
    fireEvent.click(screen.getByLabelText(/현금영수증 신청/i));

    // 비숫자 현금영수증 번호 입력
    fireEvent.change(screen.getByPlaceholderText(/숫자만 입력해주세요/i), {
      target: { value: 'abc123' },
    });

    // 폼 제출
    fireEvent.click(screen.getByText(/결제하기/i));

    // 경고 문구 확인
    expect(await screen.findByText('현금영수증 번호는 숫자로만 입력해주세요.')).toBeInTheDocument();
  });

  test('메시지를 입력하지 않았을 때 경고출력', async () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);

    // 폼 제출
    fireEvent.click(screen.getByText(/결제하기/i));

    // 경고 문구 확인
    expect(await screen.findByText('메시지를 입력해주세요.')).toBeInTheDocument();
  });

  test('메시지가 100자를 넘어갈 때 경고출력', async () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);

    // 100자를 넘는 메시지 입력
    const longMessage = 'a'.repeat(101);
    fireEvent.change(screen.getByPlaceholderText(/선물과 함께 보낼 메시지를 적어보세요/i), {
      target: { value: longMessage },
    });

    // 폼 제출
    fireEvent.click(screen.getByText(/결제하기/i));

    // 경고 문구 확인
    expect(await screen.findByText('메시지는 100자 이내로 입력해주세요.')).toBeInTheDocument();
  });

  test('정상적으로 입력했을 때 주문이 되는지 확인', async () => {
    renderWithProviders(<OrderForm orderHistory={orderHistory} />);

    // 유효한 메시지 입력
    fireEvent.change(screen.getByPlaceholderText(/선물과 함께 보낼 메시지를 적어보세요/i), {
      target: { value: '유효한 메시지입니다.' },
    });

    // 폼 제출
    fireEvent.click(screen.getByText(/결제하기/i));

    // 주문 완료 문구 확인
    expect(await screen.findByText('주문이 완료되었습니다.')).toBeInTheDocument();
  });
});
