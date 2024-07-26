import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { GoodsDetail } from '@/components/features/Goods/Detail';
import { AuthProvider } from '@/provider/Auth';

const queryClient = new QueryClient();

interface RenderOptions {
  route?: string;
}

const renderWithProviders = (ui: ReactNode, { route = '/' }: RenderOptions = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>{ui}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe('GoodsDetail 컴포넌트', () => {
  it('주어진 productId에 해당하는 상품 이름과 가격을 올바르게 표시해야 한다.', async () => {
    const product = PRODUCTS_MOCK_DATA.content[0];
    const productId = product.id.toString();
    const { name, price } = product;

    renderWithProviders(<GoodsDetail productId={productId} />);

    await waitFor(() => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(`${price}원`)).toBeInTheDocument();
    });
  });

  it('상품 이미지를 표시해야 합니다', async () => {
    const product = PRODUCTS_MOCK_DATA.content[0];
    const productId = product.id.toString();
    const { imageUrl } = product;

    renderWithProviders(<GoodsDetail productId={productId} />);

    await waitFor(() => {
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', imageUrl);
    });
  });
});
