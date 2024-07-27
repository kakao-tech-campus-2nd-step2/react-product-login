import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, screen } from '@testing-library/react';

import { queryClient } from '@/api/instance';
import { useAuth } from '@/provider/Auth';
import { renderWithRouter } from '@/utils/test/renderWithRouter';

import { OptionSection } from './OptionSection';

jest.mock('@/provider/Auth');
const mockUseAuth = useAuth as jest.Mock;
const router = [
  {
    element: <div>Login!</div>,
    path: '/login',
  },
  {
    element: <div>Order!</div>,
    path: '/order',
  },
];

test('로그인 정보가 없을 시 로그인 메뉴로 이동', async () => {
  const productId = 3245119;
  window.confirm = jest.fn();

  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <OptionSection productId={String(productId)} />
    </QueryClientProvider>,
    router,
  );

  await screen.findByText('Option A');

  fireEvent.click(screen.getByText('나에게 선물하기'));
  expect(window.confirm).toBeCalled();
});

test('로그인 정보가 있을 시 sessionStorage에 주문 정보 저장 후 order로 라우팅', async () => {
  const productId = 3245119;

  const spySetStorage = jest.spyOn(window.sessionStorage.__proto__, 'setItem');
  mockUseAuth.mockReturnValue({ id: 'test', name: 'test', token: 'test' });

  renderWithRouter(
    <QueryClientProvider client={queryClient}>
      <OptionSection productId={String(productId)} />
    </QueryClientProvider>,
    router,
  );

  await screen.findByText('Option A');

  fireEvent.click(screen.getByText('나에게 선물하기'));
  expect(useAuth).toBeCalled();
  expect(spySetStorage).toBeCalled();

  expect(screen.getByText('Order!')).toBeInTheDocument();
  const storageData = JSON.parse(window.sessionStorage.getItem('orderHistory') || '');
  expect(storageData).toEqual({ id: productId, count: 1 });
});
