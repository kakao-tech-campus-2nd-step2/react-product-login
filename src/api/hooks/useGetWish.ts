import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { WishData, WishListData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

type RequestParams = {
  page?: number;
  size?: number;
  sort?: string;
};

type ResponseData = {
  wishes: WishData[];
  pageInfo: {
    pageNumber?: string;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
  };
};

export const getWishesPath = ({ page = 0, size = 2, sort = 'createdDate,desc' }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('page', String(page));
  params.append('size', String(size));
  params.append('sort', sort);

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};

export const getWishes = async (params: RequestParams): Promise<ResponseData> => {
  const response = await fetchInstance.get<WishListData>(getWishesPath(params));
  const data = response.data;

  return {
    wishes: data.content,
    pageInfo: {
      pageNumber: data.last === false ? data.pageable.pageNumber.toString() : undefined,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      last: data.last,
      size: data.size,
    },
  };
};

export const useGetWishes = ({
  maxResults = 2,
  sort = 'createdDate,desc',
}): UseInfiniteQueryResult<InfiniteData<ResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['wishes'],
    queryFn: async ({ pageParam }) => {
      return getWishes({ page: pageParam, size: maxResults, sort: sort });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage.pageInfo;
      if (!pageNumber) return undefined;
      return Number(pageNumber) < totalPages ? Number(pageNumber) + 1 : undefined;
    },
  });
};
