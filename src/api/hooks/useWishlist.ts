import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

interface WishlistRequestParams {
  productId: string;
}

export interface WishlistResponseData {
  id: number;
  productId: string;
}

const WISHLIST_PATH = `${BASE_URL}/api/wishlist`;
const getWishPath = (wishId: number) => `${BASE_URL}/api/wishes/${wishId}`;

export const fetchWishlist = () =>
  fetchInstance.get<WishlistResponseData[]>(WISHLIST_PATH).then(res => res.data);

export const postWishlist = (params: WishlistRequestParams) =>
  fetchInstance.post<WishlistResponseData>(WISHLIST_PATH, params).then(res => res.data);

const deleteWishlist = (wishId: number) =>
  fetchInstance.delete<void>(getWishPath(wishId)).then(res => res.status);

export const useFetchWishlist = () => {
  return useQuery({
    queryKey: [WISHLIST_PATH],
    queryFn: fetchWishlist,
  });
};

export const usePostWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [WISHLIST_PATH],
    mutationFn: postWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WISHLIST_PATH] });
    },
  });
};

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [WISHLIST_PATH],
    mutationFn: deleteWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WISHLIST_PATH] });
    },
  });
};
