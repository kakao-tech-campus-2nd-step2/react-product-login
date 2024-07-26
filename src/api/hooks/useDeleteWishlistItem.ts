import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export const deleteWishlistItem = async (wishId: number) => {
  await fetchInstance.delete(`${BASE_URL}/api/wishes/${wishId}`, {
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
