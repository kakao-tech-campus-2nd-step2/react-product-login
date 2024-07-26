// src/api/hooks/useDeleteWish.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export const deleteWishListPath = (wishId: number) => `${BASE_URL}/api/wishes/${wishId}`;

const deleteWish = async (wishId: number) => {
  await fetchInstance.delete(deleteWishListPath(wishId));
};

export const useDeleteWish = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishes'] }); // Use object with queryKey property
    },
    onError: (error) => {
      console.error('Error deleting wish:', error);
    },
  });
};
