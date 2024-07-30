import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { fetchInstance } from '../instance';
import { PRODUCTS_MOCK_DATA } from './products.mock';
import { useGetProductDetail } from './useGetProductDetail';

jest.mock('../instance', () => ({
  fetchInstance: {
    get: jest.fn(),
  },
}));

const queryClient = new QueryClient();

// 테스트를 위한 컴포넌트
const TestComponent = ({ productId }: { productId: string }) => {
  const { data } = useGetProductDetail({ productId });

  if (!data) return null;

  return (
    <div>
      <h1 data-testid='product-name'>{data.name}</h1>
      <img data-testid='product-image' src={data.imageUrl} alt={data.name} />
      <p data-testid='product-price'>{data.price}</p>
    </div>
  );
};

test('useGetProductDetail 가 성공적으로 상품 세부데이터를 Fetching', async () => {
  // Given: mock 데이터 설정
  (fetchInstance.get as jest.Mock).mockResolvedValue({
    data: PRODUCTS_MOCK_DATA.content[0], // 단일 상품 데이터 반환
  });

  // When: 컴포넌트를 렌더링하고, 데이터 로딩 완료를 기다림
  render(
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <TestComponent productId="3245119" />
      </React.Suspense>
    </QueryClientProvider>
  );

  // Then: 초기 상태 확인 (로딩 중)
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // 데이터 로딩 후 상태 확인
  await waitFor(() => expect(screen.getByTestId('product-name')).toBeInTheDocument());

  // 데이터 요소 검증
  expect(screen.getByTestId('product-name')).toHaveTextContent(PRODUCTS_MOCK_DATA.content[0].name);
  expect(screen.getByTestId('product-image')).toHaveAttribute('src', PRODUCTS_MOCK_DATA.content[0].imageUrl);
  expect(screen.getByTestId('product-image')).toHaveAttribute('alt', PRODUCTS_MOCK_DATA.content[0].name);
  expect(screen.getByTestId('product-price')).toHaveTextContent(PRODUCTS_MOCK_DATA.content[0].price.toString());
});
