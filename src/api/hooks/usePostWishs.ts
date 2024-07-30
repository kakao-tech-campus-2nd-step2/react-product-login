import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

import { authSessionStorage } from '@/utils/storage';

const postWishs = async (productId: number) => {
  const response = await fetchInstance.post(
    `${BASE_URL}/api/wishes`,
    {
      productId,
    },
    {
      headers: {
        Authorization: `Bearer ${authSessionStorage.get()?.token}`,
      },
    },
  );
  return response.data;
};

export const usePostWishs = () => {
  return useMutation({
    mutationFn: (productId: number) => postWishs(productId),
  });
};
