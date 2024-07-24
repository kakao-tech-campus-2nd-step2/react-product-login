import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/mocks/server';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

import { PRODUCTS_MOCK_DATA } from './products.mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
