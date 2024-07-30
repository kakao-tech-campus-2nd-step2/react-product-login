import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

import { authSessionStorage } from '@/utils/storage';

export const deleteWishsPath = (wishId: string) => `${BASE_URL}/api/wishes/${wishId}`;

const deleteWishs = async (wishId: string) => {
  const response = await fetchInstance.delete(deleteWishsPath(wishId), {
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()?.token}`,
    },
  });
  return response.data;
};

export const useDeleteWishs = () => {
  return useMutation({
    mutationFn: (wishId: number) => deleteWishs(wishId.toString()),
  });
};
