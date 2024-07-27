// 상품 목록을 불러와 그리드에 렌더링(통합 테스트)
// API 호출을 Mocking하여 제품이 제대로 로드되고 표시되는지 검증

import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';

import { CategoryProductsSection } from '@/components/features/Category/CategoryProductsSection/index';

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    const categoryId = req.url.searchParams.get('categoryId');
    if (categoryId === '2920') {
      return res(ctx.json({
        pages: [
          {
            products: [
              { id: '1', imageUrl: 'image1.png', name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)', price: 145000 },
              { id: '2', imageUrl: 'image2.png', name: '외식 통합권 10만원권', price: 100000 },
            ]
          }
        ]
      }));
    }
  })
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

describe('CategoryProductsSection Component', () => {
  it('loads and displays products', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CategoryProductsSection categoryId="2920" />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('145000')).toBeInTheDocument();
      expect(screen.getByText(/피렌체 1221 에디션/)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

});