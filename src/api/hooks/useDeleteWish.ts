import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

export const deleteWish = async (wishId: number): Promise<void> => {
  await fetchInstance.delete(ApiPath.wishes.detail(wishId), {
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()}`,
    },
  });
};

export const useDeleteWish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (wishId: number) => deleteWish(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishList'],
      });
    },
  });
};
