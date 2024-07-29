import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchWithToken } from '../instance';

export const getDeleteWishlistPath = (productId: string) => `${BASE_URL}/api/wishes/${productId}`;

export const DeleteWishlist = async (productId: string) => {
  const response = await fetchWithToken.delete(getDeleteWishlistPath(productId));

  return response;
};

interface DeleteWishlistParams {
  productId: string;
}
export const useDeleteWishlist = () => {
  return useMutation({
    mutationKey: ['deleteWishlist'],
    mutationFn: ({ productId }: DeleteWishlistParams) => DeleteWishlist(productId),
  });
};
