import { type InfiniteData, useInfiniteQuery, type UseInfiniteQueryResult } from '@tanstack/react-query';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

import type { WishListData, WishlistResponse } from '@/types';
import { authSessionStorage } from '@/utils/storage';

type RequestParams = {
  pageToken?: string;
  maxResults?: number;
};

type WishListResponseData = {
  products: WishListData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};
export const getWishListPath = ({ pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};

export const getWishList = async (params: RequestParams): Promise<WishListResponseData> => {
  const response = await fetchInstance.get<WishlistResponse>(getWishListPath(params), {
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()?.token}`,
    },
  });
  const data = response.data;

  return {
    products: data.content.map((item) => ({
      id: item.id,
      product: item.product,
    })),
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults'> & { initPageToken?: string };
export const useGetWishList = ({
  maxResults = 10,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<WishListResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['wishList', maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getWishList({ pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
