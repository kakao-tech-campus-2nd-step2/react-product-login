import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchWithToken } from '../instance';

interface PostWishlistRequestParams {
  productId: string;
}

export interface PostWishlistResponseData {
  id: 1;
  productId: 1;
}

export const getPostWishlistPath = () => `${BASE_URL}/api/wishlist`;

export const postWishlist = async (params: PostWishlistRequestParams) => {
  const response = await fetchWithToken.post<PostWishlistResponseData>(
    getPostWishlistPath(),
    params,
  );
  return response.data;
};

export const usePostWishlist = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationKey: [getPostWishlistPath()],
    mutationFn: (params: PostWishlistRequestParams) => postWishlist(params),
    onSuccess,
  });
};
