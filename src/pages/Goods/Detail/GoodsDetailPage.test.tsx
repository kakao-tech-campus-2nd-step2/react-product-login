import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { server } from '@/mocks/server';

const queryClient = new QueryClient();

const TestComponent = (renderUi: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {renderUi}
    </QueryClientProvider>
  );
};

test('GoodsDetail 이 성공적으로 렌더링', async () => {
  server.use(
    rest.get('/api/product/:productId', (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA.content[0]));
    }),
  );

  TestComponent(<GoodsDetail productId={String(PRODUCTS_MOCK_DATA.content[0].id)} />);

  expect(await screen.findByRole('img')).toHaveAttribute(
    'src',
    PRODUCTS_MOCK_DATA.content[0].imageUrl,
  );

  expect(screen.getByText(PRODUCTS_MOCK_DATA.content[0].name)).toBeInTheDocument();
  expect(screen.getByText(`${PRODUCTS_MOCK_DATA.content[0].price}원`)).toBeInTheDocument();
  expect(screen.getByText('카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!')).toBeInTheDocument();
});