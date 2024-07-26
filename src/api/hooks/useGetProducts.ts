import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { PRODUCTS_MOCK_DATA } from '../mocks/products.mock';

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

type ProductsResponseData = {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

// 모킹 데이터를 반환하는 함수
export const getProducts = async (): Promise<ProductsResponseData> => {
  const data = PRODUCTS_MOCK_DATA;

  return {
    products: data.content,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async () => {
      return getProducts();
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
