import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { productsMockHandler } from '@/api/hooks/products.mock';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { AuthProvider } from '@/provider/Auth';

import { GoodsDetailPage } from './index';

const queryClient = new QueryClient();
const server = setupServer(...productsMockHandler);

const renderWithProviders = (ui: React.ReactNode, { route = '/products/3245119' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/products/:productId" element={ui} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

jest.mock('@/provider/Auth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useParams: () => ({ productId: '3245119' }),
  };
});

jest.mock('@/api/hooks/useGetProductDetail', () => ({
  useGetProductDetail: jest.fn(),
}));

jest.mock('@/api/hooks/useGetProductOptions', () => ({
  useGetProductOptions: jest.fn(),
}));

const mockProductDetail = {
  id: 3245119,
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  imageUrl:
    'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
  price: 145000,
};

const mockProductOptions = [
  { id: 1, name: 'Option A', quantity: 10, productId: 1 },
  { id: 2, name: 'Option B', quantity: 20, productId: 1 },
];

describe('GoodsDetailPage Tests', () => {
  beforeEach(() => {
    (useGetProductDetail as jest.Mock).mockReturnValue({ data: mockProductDetail });
    (useGetProductOptions as jest.Mock).mockReturnValue({ data: mockProductOptions });
  });

  test('상품 상세 페이지 렌더링 및 정보 표시 테스트', async () => {
    renderWithProviders(<GoodsDetailPage />, { route: '/products/3245119' });

    await waitFor(() => {
      expect(
        screen.getByText('[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)'),
      ).toBeInTheDocument();
      expect(screen.getByText('145000원')).toBeInTheDocument();
    });
  });

  test('상품 상세 페이지 에러 처리 테스트', async () => {
    server.use(
      rest.get('https://api.example.com/api/products/:productId', (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      }),
    );

    renderWithProviders(<GoodsDetailPage />, { route: '/products/error' });

    await waitFor(() => {
      expect(screen.getByText('에러 페이지')).toBeInTheDocument();
    });
  });
});
