import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { OrderForm } from '@/components/features/Order/OrderForm';
import { server } from '@/mocks/server';
import type { OrderHistory } from '@/types';

window.alert = jest.fn();

/* 
export type OrderHistory = {
  id: number;
  count: number;
};
*/

const orderHistoryMock: OrderHistory = {
  id: 1,   // 임의 설정
  count: 1 // 임의 설정
};

const queryClient = new QueryClient();

const TestComponent = (renderUi: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {renderUi}
    </QueryClientProvider>
  );
};

test('orderForm 이 성공적으로 제출', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  TestComponent(<OrderForm orderHistory={orderHistoryMock} />);

  // 메시지 카드 입력 필드에 텍스트 입력
  const messageInput = await screen.findByTestId('message-card-input');
  fireEvent.change(messageInput, { target: { value: '테스트 메시지' } });

  // 현금 영수증 신청 체크
  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  fireEvent.click(cashReceiptCheckbox);

  // 현금 영수증 번호 입력
  const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;
  fireEvent.change(cashReceiptNumberInput, { target: { value: '01012345678' } });

  // 현재 입력 필드 값 확인 (디버깅 용)
  console.log('Cash Receipt Number Input Value:', cashReceiptNumberInput.value);
  
  // 폼 제출
  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);

  // 주문 완료 메시지 확인
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('주문이 완료되었습니다.');
  });
});

test('unexpected submit 에서 성공적으로 오류 메시지 출력', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  TestComponent(<OrderForm orderHistory={orderHistoryMock} />);

  // 폼 제출
  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);

  // 유효성 검사 오류 메시지 확인
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('메시지를 입력해주세요.');
  });
});

test('GoodsInfo 를 성공적으로 렌더링', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  TestComponent(<OrderForm orderHistory={orderHistoryMock} />);

  // 상품 정보 확인
  await waitFor(() => {
    expect(
      screen.getByText(`${PRODUCTS_MOCK_DATA.content[0].name} X ${orderHistoryMock.count}개`),
    ).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute('src', PRODUCTS_MOCK_DATA.content[0].imageUrl);
  });
});

test('OrderInfo 를 성공적으로 렌더링', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  TestComponent(<OrderForm orderHistory={orderHistoryMock} />);

  // 총 결제 금액 확인
  const totalPrice = PRODUCTS_MOCK_DATA.content[0].price * orderHistoryMock.count;
  await waitFor(() => {
    expect(screen.getByText(`${totalPrice}원`)).toBeInTheDocument();
  });

  // 결제 버튼 확인
  const submitButton = screen.getByTestId('submit-button');
  expect(submitButton).toBeInTheDocument();
});

test('cashReceipt Checkbox 상태에 따라 성공적으로 필드 활성화 및 비활성화', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  TestComponent(<OrderForm orderHistory={orderHistoryMock} />);

  // 현금 영수증 신청 체크박스
  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  const cashReceiptTypeSelect = screen.getByTestId('cash-receipt-type-select');
  const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.') as HTMLInputElement;

  // 체크박스가 선택되지 않은 상태에서 필드가 비활성화 되어 있는지 확인
  expect(cashReceiptTypeSelect).toBeDisabled();
  expect(cashReceiptNumberInput).toBeDisabled();

  // 체크박스를 클릭하여 선택
  fireEvent.click(cashReceiptCheckbox);

  // 체크박스가 선택된 상태에서 필드가 활성화 되어 있는지 확인
  expect(cashReceiptTypeSelect).not.toBeDisabled();
  expect(cashReceiptNumberInput).not.toBeDisabled();

  // 필드에 값을 입력
  fireEvent.change(cashReceiptNumberInput, { target: { value: '01012345678' } });
  expect(cashReceiptNumberInput.value).toBe('01012345678');

  // 체크박스를 다시 클릭하여 선택 해제
  fireEvent.click(cashReceiptCheckbox);

  // 체크박스가 선택 해제된 상태에서 필드가 비활성화 되어 있는지 확인
  expect(cashReceiptTypeSelect).toBeDisabled();
  expect(cashReceiptNumberInput).toBeDisabled();
});

test('Form Validation 를 성공적으로 수행', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  TestComponent(<OrderForm orderHistory={orderHistoryMock} />);

  const cashReceiptCheckbox = screen.getByLabelText('현금영수증 신청');
  fireEvent.click(cashReceiptCheckbox);

  const submitButton = screen.getByTestId('submit-button');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호를 입력해주세요.');
  });

  // 의도적인 오류 발생 시키기
  const cashReceiptNumberInput = screen.getByPlaceholderText('(-없이) 숫자만 입력해주세요.');
  fireEvent.change(cashReceiptNumberInput, { target: { value: 'intendedError' } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('현금영수증 번호는 숫자로만 입력해주세요.');
  });
});