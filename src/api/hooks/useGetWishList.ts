import { useMutation } from '@tanstack/react-query';

import type { WishData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export type WishRequestData = {
  wishId: number;
};

export const getWishListPath = () => `${BASE_URL}/api/wishlist`;

export const getWishList = async (product: WishData) => {
  const response = await fetchInstance.post<WishData>(getWishListPath(), product);
  return response.data;
};

export const useGetWishList = () => {
  return useMutation({
    mutationFn: (product: WishData) => getWishList(product),
  });
};
