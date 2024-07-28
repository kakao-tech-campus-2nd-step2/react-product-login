import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { OrderForm } from '@/components/features/Order/OrderForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { OrderHistory } from '@/types';
import { server } from '@/mocks/server';
import { MemoryRouter } from 'react-router-dom';

// MSW 서버를 테스트 전에 설정하고 테스트 후에 정리
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 경고 및 에러 무시
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock alert
});

afterEach(() => {
  jest.restoreAllMocks();
});

const orderHistory: OrderHistory = { id: 3245119, count: 1 };

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

describe('OrderForm validation', () => {
  test('현금영수증 번호 누락 시 경고문구출력', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    // 현금영수증 신청 체크박스 클릭
    fireEvent.click(screen.getByLabelText(/현금영수증 신청/i));

    // 현금영수증 번호를 입력하지 않고 폼 제출
    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    // 경고 문구 확인
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
    });
  });

  test('현금영수증 번호가 숫자가 아닐 시 경고출력', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    // 현금영수증 신청 체크박스 클릭
    fireEvent.click(screen.getByLabelText(/현금영수증 신청/i));

    // 비숫자 현금영수증 번호 입력
    fireEvent.change(screen.getByPlaceholderText(/숫자만 입력해주세요/i), {
      target: { value: 'abc123' },
    });

    // 폼 제출
    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    // 경고 문구 확인
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
    });
  });

  test('메시지를 입력하지 않았을 때 경고출력', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    // 폼 제출
    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    // 경고 문구 확인
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
    });
  });

  test('메시지가 100자를 넘어갈 때 경고출력', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });

    // 100자를 넘는 메시지 입력
    const longMessage = 'a'.repeat(101);
    fireEvent.change(screen.getByPlaceholderText(/선물과 함께 보낼 메시지를 적어보세요/i), {
      target: { value: longMessage },
    });

    // 폼 제출
    const submitButton = screen.getByText(/결제하기/i);
    fireEvent.click(submitButton);

    // 경고 문구 확인
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('메시지는 100자 이내로 입력해주세요.');
    });
  });

  test('정상적으로 입력했을 때 주문이 되는지 확인', async () => {
    await act(async () => {
      renderWithProviders(<OrderForm orderHistory={orderHistory} />);
    });
    screen.debug();

    // 유효한 메시지 입력
    fireEvent.change(screen.getByPlaceholderText(/선물과 함께 보낼 메시지를 적어보세요/i), {
      target: { value: '유효한 메시지입니다.' },
    });
    screen.debug();

    // 폼 제출
    const submitButton = document.querySelector('.css-mnynd6');
    if (submitButton) {
      fireEvent.click(submitButton);
    } else {
      throw new Error('Submit button not found');
    }

    // 주문 완료 문구 확인
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
    });
  });
});
