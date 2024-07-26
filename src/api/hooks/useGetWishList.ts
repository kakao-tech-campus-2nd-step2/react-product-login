import { type InfiniteData, useInfiniteQuery, type UseInfiniteQueryResult } from '@tanstack/react-query';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

import type { WishListData } from '@/types';

type RequestParams = {
  pageToken?: string;
  maxResults?: number;
};

type WishListResponseData = {
  content: WishListData[];
  pageToken: string;
  pageSize: number;
};

export const getWishListPath = ({ pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};

export const getWishList = async (params: RequestParams): Promise<WishListResponseData> => {
  const response = await fetchInstance.get(getWishListPath(params), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = response.data;

  return {
    content: data.content,
    pageToken: data.last ? undefined : data.number + 1,
    pageSize: data.size,
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
    getNextPageParam: (lastPage) => lastPage.pageToken,
  });
};
