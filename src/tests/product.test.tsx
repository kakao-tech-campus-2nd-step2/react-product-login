import '@testing-library/jest-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { queryClient } from '@/api/instance';
import { GoodsDetailPage } from '@/pages/Goods/Detail';
import { AuthProvider } from '@/provider/Auth';
import { authSessionStorage } from '@/utils/storage';

import { worker } from '../../server';

beforeAll(() => {
  worker.listen({
    onUnhandledRequest: 'warn',
  });
  window.alert = jest.fn();
});
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());

const renderWithProviders = (ui: ReactElement, { route = '/' } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/products/:productId" element={ui} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>,
  );
};

test('유효한 상품 아이디를 제공했을 때, 데이터 잘 불러와서 렌더링 잘 되는지', async () => {
  renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119' });
  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  expect(
    screen.getByText(/\[단독각인\] 피렌체 1221 에디션 오드코롱 50ml \(13종 택1\)/i),
  ).toBeInTheDocument();

  expect(
    screen.getByText(/카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!/),
  ).toBeInTheDocument();
});

test('유효하지 않은 상품 아이디를 제공했을 때, 에러 잘 발생시키고 잡는지.', async () => {
  renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119zz' });

  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });

  expect(screen.getByText('에러 페이지')).toBeInTheDocument();
});

test('상품 개수 증가 및 감소 버튼 잘 동작 및 UI에 잘 반영 되는지.', async () => {
  const user = userEvent.setup();
  renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119' });

  const incrementButton = screen.getByLabelText('수량 1개 추가');
  const decrementButton = screen.getByLabelText('수량 1개 감소');
  const totalPrice = screen.getByText('총 결제 금액');

  expect(totalPrice).toHaveTextContent('145000');

  await user.click(incrementButton);

  expect(totalPrice).toHaveTextContent('290000');

  await user.click(decrementButton);

  expect(totalPrice).toHaveTextContent('145000');
});

test('로그인 했을 때, 상품 위시리스트에 잘 추가 되며 성공 여부 알러트로 잘 나타나는지.', async () => {
  authSessionStorage.set('qqqq@qqq.com');
  localStorage.setItem('token', 'mock-token');
  const user = userEvent.setup();
  renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119' });
  const addButton = screen.getByText('위시리스트에 추가');

  await user.click(addButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('관심 등록 완료');
  });

  localStorage.removeItem('token');
});
