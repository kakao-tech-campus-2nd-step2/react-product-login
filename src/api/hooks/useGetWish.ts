import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import { BASE_URL } from '@/api/instance';

type WishData = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

type RequestParams = {
  pageToken?: string;
  maxResults?: number;
};

type GetWishesResponseData = {
  wishes: WishData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type GetWishesResponseRawData = {
  content: WishData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};

export const getWishesPath = ({ pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};

export const getWishes = async (params: RequestParams): Promise<GetWishesResponseData> => {
  const response = await fetchInstance.get<GetWishesResponseRawData>(getWishesPath(params));
  const data = response.data;

  return {
    wishes: data.content,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults'> & { initPageToken?: string };

export const useGetWishes = ({
  maxResults = 10,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<GetWishesResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['wishes', maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getWishes({ pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
