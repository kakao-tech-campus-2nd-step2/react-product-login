import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import type { PropsWithChildren } from 'react';

import { BASE_URL } from '../../instance';
import { getCategories, useGetCategories } from '../useGetCategorys';

describe('useGetCategorys.ts', () => {
  const server = setupServer(
    rest.get(`${BASE_URL}/api/categories`, (_, res, ctx) => {
      return res(
        ctx.json([
          { id: 1, name: '카테고리 1' },
          { id: 2, name: '카테고리 2' },
        ]),
      );
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('[api] getCategories', () => {
    it('카테고리를 올바르게 가져온다', async () => {
      const categories = await getCategories();
      expect(categories).toEqual([
        { id: 1, name: '카테고리 1' },
        { id: 2, name: '카테고리 2' },
      ]);
    });

    it('API 호출 실패 시 에러를 던진다', async () => {
      server.use(
        rest.get(`${BASE_URL}/api/categories`, (_, res, ctx) => {
          return res(ctx.status(500));
        }),
      );

      await expect(getCategories()).rejects.toThrow();
    });
  });

  describe('[hook] useGetCategories', () => {
    let createWrapper: () => ({ children }: PropsWithChildren) => JSX.Element;

    beforeEach(() => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      createWrapper =
        () =>
        ({ children }: PropsWithChildren) => (
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
    });

    it('성공적으로 카테고리를 가져온다', async () => {
      const { result } = renderHook(() => useGetCategories(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual([
        { id: 1, name: '카테고리 1' },
        { id: 2, name: '카테고리 2' },
      ]);
    });

    it('데이터를 가져오는 동안 로딩 상태를 표시한다', async () => {
      const { result } = renderHook(() => useGetCategories(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.isLoading).toBe(false);
    });

    it('API 호출 실패 시 에러 상태를 표시한다', async () => {
      server.use(
        rest.get(`${BASE_URL}/api/categories`, (_, res, ctx) => {
          return res(ctx.status(500));
        }),
      );

      const { result } = renderHook(() => useGetCategories(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });
  });
});
