import { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';

import { queryClient } from '@/api/config/queryClient';
import { PRODUCTS_MOCK_DATA } from '@/mocks/products.mock';
import { ProductsDetailPage } from '@/pages/ProductDetailPage';
import { useAuth } from '@/provider/auth/useAuth';
import { ProductData } from '@/types/productType';

jest.mock('@/provider/auth/useAuth');

const renderWithProviders = (ui: ReactElement, { route = '/' } = {}) => {
  return render(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/products/:productId" element={ui} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

describe('Product Page 렌더링 테스트', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      authInfo: {
        email: 'test@kakao.com',
        name: 'test',
        token: 'token_test',
      },
    });
  });

  test('mock Product Detail data 렌더링', async () => {
    type ProductMockData = Omit<ProductData, 'categoryId'>;
    const testData: ProductMockData = PRODUCTS_MOCK_DATA.content[0];

    await act(async () => {
      renderWithProviders(<ProductsDetailPage />, {
        route: `/products/${testData.id}`,
      });
    });

    const productDetailName = screen.getByTestId('product-detail-name');
    expect(productDetailName).toHaveTextContent(testData.name);

    const productDetailPrice = screen.getByTestId('product-detail-price');
    expect(productDetailPrice).toHaveTextContent(testData.price.toString());
  });
});
