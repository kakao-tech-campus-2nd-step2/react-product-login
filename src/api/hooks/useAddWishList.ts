import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchWithTokenInstance } from '../instance';

export type WishRequestData = {
  productId: number;
};

type Props = WishRequestData;

export type WishResponseData = {
  id: number;
  productId: number;
};

export const postAddWishListPath = () => `${BASE_URL}/api/wishes`;

export const addWishList = async (product: WishRequestData) => {
  const response = await fetchWithTokenInstance.post<WishResponseData>(
    postAddWishListPath(),
    product,
  );
  return response.data;
};

export const useAddWishList = () => {
  return useMutation({
    mutationFn: (product: Props) => addWishList(product),
  });
};
