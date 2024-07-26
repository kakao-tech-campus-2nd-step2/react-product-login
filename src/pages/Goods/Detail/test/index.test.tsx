import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { GoodsDetailPage } from '..';

const server = setupServer();

describe('GoodsDetailPage', () => {
  const queryClient = new QueryClient();

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  const renderComponent = (productId: string) => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/goods/${productId}`]}>
          <Routes>
            <Route path="/goods/:productId" element={<GoodsDetailPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  };

  it('상품 상세 페이지를 올바르게 렌더링한다', async () => {
    server.use(
      rest.get('*/api/products/123', (_, res, ctx) => {
        return res(ctx.json({ id: '123', name: '테스트 상품', price: 10000 }));
      }),
      rest.get('*/api/products/123/options', (_, res, ctx) => {
        return res(ctx.json([{ id: '1', name: '색상', values: ['빨강', '파랑'] }]));
      }),
    );

    renderComponent('123');

    await waitFor(() => {
      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
      expect(screen.getByText('10000')).toBeInTheDocument();
      expect(screen.getByText('색상')).toBeInTheDocument();
    });
  });

  it('로딩 상태를 올바르게 표시한다', async () => {
    server.use(
      rest.get('*/api/products/123', (_, res, ctx) => {
        return res(ctx.delay(100), ctx.json({}));
      }),
    );

    renderComponent('123');

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('에러 상태를 올바르게 처리한다', async () => {
    server.use(
      rest.get('*/api/products/123', (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    renderComponent('123');

    await waitFor(() => {
      expect(screen.getByText('에러 페이지')).toBeInTheDocument();
    });
  });

  it('URL 파라미터로부터 상품 ID를 올바르게 추출한다', async () => {
    server.use(
      rest.get('*/api/products/456', (_, res, ctx) => {
        return res(ctx.json({ id: '456', name: '다른 상품' }));
      }),
    );

    renderComponent('456');

    await waitFor(() => {
      expect(screen.getByText('다른 상품')).toBeInTheDocument();
    });
  });
});
