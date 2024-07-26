import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test('상품_상세_헤더가_상품_정보와_함께_렌더링', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  render(<GoodsDetailHeader productId="3245119" />, { wrapper: createWrapper() });

  expect(await screen.findByRole('img')).toHaveAttribute(
    'src',
    PRODUCTS_MOCK_DATA.content[0].imageUrl,
  );
  expect(screen.getByText(PRODUCTS_MOCK_DATA.content[0].name)).toBeInTheDocument();
  expect(screen.getByText(`${PRODUCTS_MOCK_DATA.content[0].price}원`)).toBeInTheDocument();
  expect(
    screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!'),
  ).toBeInTheDocument();
});
