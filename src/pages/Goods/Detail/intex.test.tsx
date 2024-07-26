import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { server } from '@/mocks/server';

// 서버 설정
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

describe('GoodsDetail 컴포넌트', () => {
  it('주어진 productId에 해당하는 상품 이름과 가격을 표시해야 합니다', async () => {
    const product = PRODUCTS_MOCK_DATA.content[0];
    const productId = product.id.toString();
    const { name, price } = product;

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GoodsDetail productId={productId} />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(`${price}원`)).toBeInTheDocument();
    });
  });

  it('상품 이미지를 표시해야 합니다', async () => {
    const product = PRODUCTS_MOCK_DATA.content[0];
    const productId = product.id.toString();
    const { imageUrl } = product;

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GoodsDetail productId={productId} />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', imageUrl);
    });
  });
});
