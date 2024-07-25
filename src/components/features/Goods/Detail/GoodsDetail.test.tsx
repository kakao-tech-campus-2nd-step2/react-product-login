import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import React from 'react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { getDynamicPath } from '@/routes/path';

import { GoodsDetail } from './index';

const queryClient = new QueryClient();
const mockServer = setupServer(...categoriesMockHandler, ...productsMockHandler);
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

const productId = '3245119';

const MockNavigate = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(getDynamicPath.login());
  }, [navigate]);

  return null;
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/products/${productId}`]}>
        <Routes>
          <Route path="/products/:productId" element={ui} />
          <Route path="/" element={<MockNavigate />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

test('상품 상세 정보가 올바르게 표시되어야 한다', async () => {
  renderWithProviders(<GoodsDetail productId={productId} />);

  expect(await screen.findByAltText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();
  expect(screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)')).toBeInTheDocument();
  expect(screen.getByText('145000원')).toBeInTheDocument();
});

