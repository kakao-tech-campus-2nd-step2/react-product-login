import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { useGetCategories } from '@/api/hooks/useGetCategorys';

import { CATEGORIES_RESPONSE_DATA } from './categories.mock';

const createWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test('useGetCategories_카테고리_데이터_반환', async () => {
  const { result } = renderHook(() => useGetCategories(), { wrapper: createWrapper() });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(CATEGORIES_RESPONSE_DATA);
});
