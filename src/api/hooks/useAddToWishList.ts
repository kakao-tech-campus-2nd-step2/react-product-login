import { useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';

import { fetchInstance } from '../instance';

interface PostWishListResponse {
  id: number;
  productId: number;
}

export const addToWishList = async (
  token: string,
  productId: number,
): Promise<PostWishListResponse> => {
  const response = await fetchInstance.post<PostWishListResponse>(
    ApiPath.wishes.root,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const useAddToWishList = () => {
  return useMutation({
    mutationFn: (params: { token: string; productId: number }) =>
      addToWishList(params.token, params.productId),
  });
};
