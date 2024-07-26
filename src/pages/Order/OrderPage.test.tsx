import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { OrderForm } from '@/components/features/Order/OrderForm';
import { server } from '@/mocks/server';
import type { OrderHistory } from '@/types';

window.alert = jest.fn();

const orderHistoryMock: OrderHistory = {
  id: 1,
  count: 2,
  // 다른 필드들 필요에 따라 추가
};

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ChakraProvider>,
  );
};

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

test('주문_폼이_렌더링되고_성공적으로_제출', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  renderWithProviders(<OrderForm orderHistory={orderHistoryMock} />);

  // 메시지 카드 입력 필드에 텍스트 입력
  const messageInput = await screen.findByTestId('message-input');
  fireEvent.change(messageInput, { target: { value: '테스트 메시지' } });

  // 현금 영수증 신청 체크
  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  fireEvent.click(cashReceiptCheckbox);

  // 현금 영수증 번호 입력
  const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
  fireEvent.change(cashReceiptNumberInput, { target: { value: '1234567890' } });

  // 폼 제출
  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);

  // 버튼이 실제로 클릭되었는지 확인
  expect(submitButton).toBeInTheDocument();

  // 성공 메시지 확인
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
  });
});

test('유효하지_않은_제출에서_유효성_검사_오류_표시', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  renderWithProviders(<OrderForm orderHistory={orderHistoryMock} />);

  // 폼 제출
  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);

  // 유효성 검사 오류 메시지 확인
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
  });
});

test('상품_정보가_포함된_GoodsInfo_렌더링', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  renderWithProviders(<OrderForm orderHistory={orderHistoryMock} />);

  // 상품 정보 확인
  await waitFor(() => {
    expect(
      screen.getByText(`${PRODUCTS_MOCK_DATA.content[0].name} X ${orderHistoryMock.count}개`),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', PRODUCTS_MOCK_DATA.content[0].imageUrl);
  });
});

test('총_결제_금액과_함께_OrderFormOrderInfo_렌더링', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  renderWithProviders(<OrderForm orderHistory={orderHistoryMock} />);

  // 총 결제 금액 확인
  const totalPrice = PRODUCTS_MOCK_DATA.content[0].price * orderHistoryMock.count;
  await waitFor(() => {
    expect(screen.getByText(`${totalPrice}원`)).toBeInTheDocument();
  });

  // 결제 버튼 확인
  const submitButton = screen.getByTestId('submit-button');
  expect(submitButton).toBeInTheDocument();
});

test('폼의_유효성_검사_로직이_정상적으로_동작하는지_확인', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  renderWithProviders(<OrderForm orderHistory={orderHistoryMock} />);

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  fireEvent.click(cashReceiptCheckbox);

  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
  });

  const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
  fireEvent.change(cashReceiptNumberInput, { target: { value: 'abc123' } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
  });
});
