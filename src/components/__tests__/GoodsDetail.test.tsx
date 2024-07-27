import '@testing-library/jest-dom/extend-expect';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent,render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { OptionSection } from '@/components/features/Goods/Detail/OptionSection';
import { server } from '@/mocks/server';
import { AuthProvider } from '@/provider/Auth';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

test('total amount of payment changed according to quantity', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthProvider>
          <OptionSection productId="3245119" />
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  /// 초기 총 결제 금액 확인
  const totalPrice = await screen.findByText('총 결제 금액');
  expect(totalPrice).toHaveTextContent('145000원');

  // 수량 증가 버튼 클릭
  const incrementButton = screen.getByLabelText('수량 1개 추가');
  fireEvent.click(incrementButton);
  expect(totalPrice).toHaveTextContent('290000원');

  // 수량 감소 버튼 클릭
  const decrementButton = screen.getByLabelText('수량 1개 감소');
  fireEvent.click(decrementButton);
  expect(totalPrice).toHaveTextContent('145000원');
});
