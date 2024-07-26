import { useMutation } from '@tanstack/react-query';

import type { WishRequestData } from '@/types';

import { BASE_URL, fetchInstanceWithAuth } from '../instance';

export const getPutWishPath = () => `${BASE_URL}/api/wishes`;

export const postWish = async ({ req, token }: { req: WishRequestData; token: string }) => {
  const response = await fetchInstanceWithAuth(token).post(getPutWishPath(), req);
  return response.data;
};

export const FetchPutWish = () =>
  useMutation({
    mutationFn: postWish,
  });
