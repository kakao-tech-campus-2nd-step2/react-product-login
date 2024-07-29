import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { server } from '@/mocks/server';
import { GoodsDetailPage } from '@/pages/Goods/Detail';

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// TODO : 상품 상세 페이지 관련된 통합 테스트 코드
// 상품 로딩 되는지

test('상품 상세 정보를 표시해야 합니다', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/goods/3245119']}>
        <Routes>
          <Route path="/goods/:productId" element={<GoodsDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
  await waitForElementToBeRemoved(() => screen.queryByRole('spinner'), { timeout: 5000 });
  expect(
    screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
  ).toBeInTheDocument();
});
