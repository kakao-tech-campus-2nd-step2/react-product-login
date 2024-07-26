import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

import { PRODUCTS_MOCK_DATA } from './products.mock';

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test('useGetProductDetail_상품_상세_데이터_반환', async () => {
  const { result } = renderHook(
    () => useGetProductDetail({ productId: PRODUCTS_MOCK_DATA.content[0].id.toString() }),
    {
      wrapper: createWrapper(),
    },
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(PRODUCTS_MOCK_DATA.content[0]);
});
