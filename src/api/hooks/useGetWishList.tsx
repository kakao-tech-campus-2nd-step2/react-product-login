import type { InfiniteData, UseInfiniteQueryResult} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

type RequestParams = {
  pageToken?: string;
  maxResults?: number;
};

type WishListResponseData = {
  products: {
    id: number;
    product: ProductData;
  }[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type WishListResponseRawData = {
  content: {
    id: number;
    product: ProductData;
  }[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export const getWishListPath = ({ pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('sort', 'createdDate,desc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};

export const getWishList = async (params: RequestParams): Promise<WishListResponseData> => {
  const response = await fetchInstance.get<WishListResponseRawData>(getWishListPath(params));
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
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<WishListResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['wishes', { maxResults }],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getWishList({ pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
