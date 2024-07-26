import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { server } from '@/mocks/server';
import { rest } from 'msw';
import { GoodsDetailHeader } from '@/components/features/Goods/Detail/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockProductDetail = {
  id: 3245119,
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  price: 145000,
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('데이터fetching확인', async () => {
  const queryClient = new QueryClient();

  server.use(
    rest.get('/api/v1/products/:productId/detail', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockProductDetail));
    })
  );

  render(
    <QueryClientProvider client={queryClient}>
      <GoodsDetailHeader productId="3245119" />
    </QueryClientProvider>
  );

  // 데이터가 올바르게 렌더링되는지 확인
  await waitFor(() => {
    expect(screen.getByAltText(mockProductDetail.name)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockProductDetail.price}원`)).toBeInTheDocument();
  });
});
