import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../instance';
import { getProducts, getProductsPath, useGetProducts } from '../useGetProducts';

const server = setupServer();

describe('Products API and Hook', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('getProductsPath', () => {
    it('올바른 URL을 생성한다', () => {
      const params = { categoryId: '123', pageToken: '2', maxResults: 10 };
      const path = getProductsPath(params);
      expect(path).toBe(`${BASE_URL}/api/products?categoryId=123&sort=name%2Casc&page=2&size=10`);
    });

    it('선택적 매개변수 없이 URL을 생성한다', () => {
      const params = { categoryId: '123' };
      const path = getProductsPath(params);
      expect(path).toBe(`${BASE_URL}/api/products?categoryId=123&sort=name%2Casc`);
    });
  });

  describe('getProducts', () => {
    it('상품 데이터를 성공적으로 가져온다', async () => {
      const mockResponse = {
        content: [
          { id: '1', name: 'Product 1' },
          { id: '2', name: 'Product 2' },
        ],
        number: 0,
        totalElements: 2,
        size: 2,
        last: true,
      };

      server.use(
        rest.get(`${BASE_URL}/api/products`, (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }),
      );

      const result = await getProducts({ categoryId: '123' });
      expect(result).toEqual({
        products: mockResponse.content,
        nextPageToken: undefined,
        pageInfo: {
          totalResults: 2,
          resultsPerPage: 2,
        },
      });
    });

    it('다음 페이지 토큰을 올바르게 처리한다', async () => {
      const mockResponse = {
        content: [{ id: '1', name: 'Product 1' }],
        number: 0,
        totalElements: 2,
        size: 1,
        last: false,
      };

      server.use(
        rest.get(`${BASE_URL}/api/products`, (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }),
      );

      const result = await getProducts({ categoryId: '123', maxResults: 1 });
      expect(result.nextPageToken).toBe('1');
    });
  });

  describe('useGetProducts', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it('초기 데이터를 성공적으로 가져온다', async () => {
      const mockResponse = {
        content: [{ id: '1', name: 'Product 1' }],
        number: 0,
        totalElements: 1,
        size: 1,
        last: true,
      };

      server.use(
        rest.get(`${BASE_URL}/api/products`, (_, res, ctx) => {
          return res(ctx.json(mockResponse));
        }),
      );

      const { result } = renderHook(() => useGetProducts({ categoryId: '123' }), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.pages[0].products).toEqual(mockResponse.content);
    });

    it('다음 페이지를 가져올 수 있다', async () => {
      const mockResponses = [
        {
          content: [{ id: '1', name: 'Product 1' }],
          number: 0,
          totalElements: 2,
          size: 1,
          last: false,
        },
        {
          content: [{ id: '2', name: 'Product 2' }],
          number: 1,
          totalElements: 2,
          size: 1,
          last: true,
        },
      ];

      let callCount = 0;
      server.use(
        rest.get(`${BASE_URL}/api/products`, (_, res, ctx) => {
          const response = mockResponses[callCount];
          callCount += 1;
          return res(ctx.json(response));
        }),
      );

      const { result } = renderHook(() => useGetProducts({ categoryId: '123', maxResults: 1 }), {
        wrapper,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.pages[0].products).toEqual(mockResponses[0].content);

      result.current.fetchNextPage();

      await waitFor(() => expect(result.current.data?.pages.length).toBe(2));

      expect(result.current.data?.pages[1].products).toEqual(mockResponses[1].content);
    });
  });
});
