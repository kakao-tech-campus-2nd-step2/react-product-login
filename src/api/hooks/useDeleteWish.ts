import { useMutation } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import { BASE_URL } from '@/api/instance';

type DeleteWishParams = {
  wishId: string;
};

export const DeleteWishPath = (wishId: string) => `${BASE_URL}/api/wishes/${wishId}`;

export const deleteWish = async (params: DeleteWishParams): Promise<void> => {
  await fetchInstance.delete(DeleteWishPath(params.wishId));
};

export const useDeleteWish = () => {
  return useMutation({
    mutationFn: deleteWish,
    onError: (error) => {
      console.error('Error deleting wish:', error);
    },
  });
};
