import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

const postWishs = async (productId: number) => {
  const response = await fetchInstance.post(
    `${BASE_URL}/api/wishes`,
    {
      productId: productId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export const usePostWishs = (productId: number) => {
  return useMutation({
    mutationFn: () => postWishs(productId),
  });
};
