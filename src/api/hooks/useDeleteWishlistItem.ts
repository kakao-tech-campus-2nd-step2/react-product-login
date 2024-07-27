import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import { WISH_LIST_PATH } from './useGetWishlist';

export const deleteWishlistItem = async (id: number) => {
  await fetchInstance.delete(`${WISH_LIST_PATH}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // TODO: 추후 수정 필요
    },
  });
};

export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (wishId: number) => deleteWishlistItem(wishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: () => console.log('여기서 에러 발생'),
  });
};
