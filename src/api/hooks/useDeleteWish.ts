import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstanceWithAuth } from '../instance';

export type WishDeleteRequestParams = {
  wishId: string;
};

export const getDeleteWishPath = (wishId: string) => `${BASE_URL}/api/wishes/${wishId}`;

export const deleteWish = async (params: WishDeleteRequestParams) => {
  const response = await fetchInstanceWithAuth().delete(getDeleteWishPath(params.wishId));

  return response.data;
};

export const useDeleteWish = () => {
  return useMutation({
    mutationFn: deleteWish,
  });
};
