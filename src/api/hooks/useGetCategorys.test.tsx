import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { CATEGORIES_RESPONSE_DATA } from '../mocks/categories.mock';
import { useGetCategories } from './useGetCategorys';
describe('useGetCategories', () => {
  it('should fetch categories correctly', async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useGetCategories(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(CATEGORIES_RESPONSE_DATA);
  });
});
