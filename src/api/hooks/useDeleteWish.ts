import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export const deleteWishsPath = (wishId: string) => `${BASE_URL}/api/wishes/${wishId}`;

const deleteWishs = async (wishId: string) => {
  const response = await fetchInstance.delete(deleteWishsPath(wishId), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const usePostWishs = (wishId: string) => {
  return useMutation({
    mutationFn: () => deleteWishs(wishId),
  });
};
