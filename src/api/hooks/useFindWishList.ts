import { useQuery } from '@tanstack/react-query';

import type { ProductListResponse } from '@/types';

import { BASE_URL, tokenInstance } from '../instance';

export const getWishListPath = () => `${BASE_URL}/api/wishes?page=0&size=10&sort=createdDate`;
const wishListQueryKey = [getWishListPath()];

export const getWishList = async () => {
  const response = await tokenInstance.get<ProductListResponse>(getWishListPath());
  return response.data;
};

export const useGetWishList = () =>
  useQuery({
    queryKey: wishListQueryKey,
    queryFn: getWishList,
  });
