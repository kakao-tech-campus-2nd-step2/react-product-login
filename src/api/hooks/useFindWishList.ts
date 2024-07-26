import { useQuery } from '@tanstack/react-query';

import type { Content, Pageable } from '@/types';

import { BASE_URL, fetchWithTokenInstance } from '../instance';

export type ProductListResponse = {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export const getWishListPath = () => `${BASE_URL}/api/wishes?page=0&size=10&sort=createdDate`;
const wishListQueryKey = [getWishListPath()];

export const getWishList = async () => {
  const response = await fetchWithTokenInstance.get<ProductListResponse>(getWishListPath());
  return response.data;
};

export const useGetWishList = () =>
  useQuery({
    queryKey: wishListQueryKey,
    queryFn: getWishList,
  });
