import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export const deleteWishListPath = (wishId: number) => `${BASE_URL}/api/wishes/${wishId}`;

export const deleteWishList = async (wishId: number) => {
  return fetchInstance.delete(deleteWishListPath(wishId));
};

export const useDeleteWishList = (wishId: number) => {
  return useMutation({
    mutationFn: () => deleteWishList(wishId),
    onSuccess: () => {
      alert('관심 목록에서 삭제되었습니다');
    },
    onError: () => {
      console.error('에러 발생');
    },
  });
};
