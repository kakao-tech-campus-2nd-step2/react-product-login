import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
};

type ThemesProductsResponseData = {
  products: GoodsData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

const getThemesProductsPath = ({ themeKey, pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();
  if (pageToken) params.append('pageToken', pageToken);
  if (maxResults) params.append('maxResults', maxResults.toString());
  return `/v1/themes/${themeKey}/products?${params.toString()}`;
};

export const getThemesProducts = async (params: RequestParams) => {
  const response = await fetchInstance.get<ThemesProductsResponseData>(
    getThemesProductsPath(params),
  );
  return response.data;
};

type Params = Pick<RequestParams, 'maxResults' | 'themeKey'> & { initPageToken?: string };
export const useGetThemesProducts = ({
  themeKey,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ThemesProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['themesProducts', themeKey, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getThemesProducts({ themeKey, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
