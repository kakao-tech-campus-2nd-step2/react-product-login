import { useMutation } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import { BASE_URL } from '@/api/instance';

type AddWishParams = {
  productId: string;
};

type AddWishResponse = {
  success: boolean;
  message: string;
};

export const PostWishPath = () => `${BASE_URL}/api/wishes`;

const PostWish = async (params: AddWishParams): Promise<AddWishResponse> => {
  const response = await fetchInstance.post<AddWishResponse>(PostWishPath(), params);
  return response.data;
};

export const usePostWish = () => {
  return useMutation({
    mutationFn: PostWish,
    onError: (error) => {
      console.error('Error adding wish:', error);
    },
  });
};
