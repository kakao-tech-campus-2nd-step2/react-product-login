import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

export interface WishListItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface GetWishListResponse {
  content: WishListItem[];
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
}

export const getWishList = async (page: number, size: number): Promise<GetWishListResponse> => {
  const response = await fetchInstance.get<GetWishListResponse>(ApiPath.wishes.root, {
    params: {
      page,
      size,
      sort: 'createdDate,desc',
    },
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()}`,
    },
  });
  return response.data;
};

export const useGetWishList = (page: number, size: number) => {
  return useQuery({
    queryKey: ['wishList', page, size],
    queryFn: () => getWishList(page, size),
  });
};
