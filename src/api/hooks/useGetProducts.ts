import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

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

type ProductsResponseRawData = {
  content: ProductData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(ApiPath.products.root, {
    params: {
      categoryId: params.categoryId,
      sort: 'name,asc',
      page: params.pageToken,
      size: params.maxResults,
    },
  });
  const data = response.data;

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
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
