import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';
import { useGetProducts } from '@/api/hooks/useGetProducts';

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test('useGetProducts_상품_데이터_반환', async () => {
  const { result } = renderHook(
    () => useGetProducts({ categoryId: '2920', maxResults: 10, initPageToken: '0' }),
    { wrapper: createWrapper() },
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data?.pages[0]).toEqual({
    products: PRODUCTS_MOCK_DATA.content,
    nextPageToken: undefined,
    pageInfo: {
      totalResults: PRODUCTS_MOCK_DATA.totalElements,
      resultsPerPage: PRODUCTS_MOCK_DATA.size,
    },
  });
});
