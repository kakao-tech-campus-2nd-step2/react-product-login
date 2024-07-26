import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export type WishListData = {
  productId: number;
};

export type AddWishListResponse = {
  id: number;
  productId: number;
};

export const addWishListPath = () => `${BASE_URL}/api/wishes`;

export const addWishList = async (data: WishListData): Promise<AddWishListResponse> => {
  const response = await fetchInstance.post(addWishListPath(), data);
  return response.data;
};

export const useAddWish = () => {
  const queryClient = useQueryClient();

  return useMutation<AddWishListResponse, Error, WishListData>({
    mutationFn: addWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishes'] }); // Use object with queryKey property
    },
    onError: (error) => {
      console.error('Error adding wish:', error);
    },
  });
};
