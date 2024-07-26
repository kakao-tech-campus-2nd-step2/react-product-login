import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { PRODUCTS_MOCK_DATA } from '../mocks/products.mock';
import { useGetProducts } from './useGetProducts';

describe('useGetProducts', () => {
  it('should fetch products correctly', async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useGetProducts({ categoryId: '1', maxResults: 20 }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0]).toEqual({
      products: PRODUCTS_MOCK_DATA.content,
      nextPageToken:
        PRODUCTS_MOCK_DATA.last === false ? (PRODUCTS_MOCK_DATA.number + 1).toString() : undefined,
      pageInfo: {
        totalResults: PRODUCTS_MOCK_DATA.totalElements,
        resultsPerPage: PRODUCTS_MOCK_DATA.size,
      },
    });
  });

  it('should handle pagination correctly', async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useGetProducts({ categoryId: '1', maxResults: 20 }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Fetch next page
    if (result.current.hasNextPage) {
      await result.current.fetchNextPage();

      await waitFor(() => expect(result.current.data?.pages.length).toBe(2));
    }

    // Check if the nextPageToken is handled correctly
    expect(result.current.data?.pages[1]?.nextPageToken).toBe(
      PRODUCTS_MOCK_DATA.last === false ? (PRODUCTS_MOCK_DATA.number + 2).toString() : undefined,
    );
  });
});
