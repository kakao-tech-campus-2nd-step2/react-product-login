import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
const LOCAL_STORAGE_TOKEN_KEY = 'token';
const QUERY_KEY_WISHLIST = 'wishList';

export interface WishItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface WishListResponse {
  content: WishItem[];
  totalPages: number;
  totalElements: number;
}

const fetchWishList = async (
  token: string,
  page: number,
  size: number,
): Promise<WishListResponse> => {
  const response = await axios.get(`${API_URL}/wishes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      size,
      sort: 'createdDate,desc',
    },
  });
  return response.data;
};

export const useWishList = (
  page: number = 0,
  size: number = 10,
  options?: UseQueryOptions<WishListResponse, Error>,
) => {
  return useQuery<WishListResponse, Error>({
    queryKey: [QUERY_KEY_WISHLIST, page, size],
    queryFn: () => fetchWishList(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || '', page, size),
    ...options,
  });
};

export const useRemoveWish = (options?: UseMutationOptions<void, Error, number>) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (wishId: number) => {
      return axios.delete(`${API_URL}/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_WISHLIST] });
    },
    ...options,
  });
};

export const useAddWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => {
      return axios.post(
        `${API_URL}/wishes`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_WISHLIST] });
    },
  });
};
