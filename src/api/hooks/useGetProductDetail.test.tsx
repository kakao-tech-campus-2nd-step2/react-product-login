import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React, { Suspense } from 'react';

import { getProductOptionsPath } from './productOptionsPath';
import { useGetProductOptions } from './useGetProductOptions';

// 모의 데이터
const mockProductOptions = [
  { id: '1', name: 'Option 1', price: 10 },
  { id: '2', name: 'Option 2', price: 20 },
];

// MSW 서버 설정
const server = setupServer(
  rest.get(getProductOptionsPath(':productId'), (_, res, ctx) => {
    return res(ctx.json(mockProductOptions));
  }),
);

describe('useGetProductOptions', () => {
  // 테스트 전에 MSW 서버 시작
  beforeAll(() => server.listen());
  // 각 테스트 후에 핸들러 리셋
  afterEach(() => server.resetHandlers());
  // 모든 테스트 후에 서버 종료
  afterAll(() => server.close());

  it('should fetch product options correctly', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useGetProductOptions({ productId: '1' }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProductOptions);
  });

  it('should handle error correctly', async () => {
    // 에러 응답을 위한 서버 핸들러 오버라이드
    server.use(
      rest.get(getProductOptionsPath(':productId'), (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useGetProductOptions({ productId: '1' }), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
