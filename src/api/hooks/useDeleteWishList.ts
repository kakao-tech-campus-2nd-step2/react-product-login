import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, tokenInstance } from '../instance';
import { getWishListPath } from './useFindWishList';
import type { WishRequestData } from './useGetWishList';

type Props = WishRequestData;

export const deleteWishListPath = (wishId: number) => `${BASE_URL}/api/wishes/${wishId}`;

export const deleteWishList = async (wishItem: WishRequestData) => {
  const response = await tokenInstance.delete(deleteWishListPath(wishItem.wishId));
  return response.data;
};

export const useDeleteWishList = () => {
  const queryClient = useQueryClient();
  const queryKey = [getWishListPath()];

  return useMutation({
    mutationFn: (wishId: Props) => deleteWishList(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
