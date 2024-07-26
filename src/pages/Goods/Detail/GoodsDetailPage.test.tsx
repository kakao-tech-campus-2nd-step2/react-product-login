import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { GoodsDetailPage } from '@/pages/Goods/Detail';

const createQueryClient = () => new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/goods/${productId}`]}>
        <Routes>
          <Route path="/goods/:productId" element={ui} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

const productId = '3245119';

test('상품 상세 정보가 올바르게 표시되어야 한다', async () => {
  renderWithProviders(<GoodsDetailPage />);

  expect(
    await screen.findByAltText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
  ).toBeInTheDocument();
  expect(
    await screen.findByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
  ).toBeInTheDocument();

  const priceElements = screen.queryAllByText('145000원');
  expect(priceElements.length).toBeGreaterThanOrEqual(1);
});
