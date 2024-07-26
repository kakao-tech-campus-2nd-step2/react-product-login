import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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

export const useWishList = (page: number = 0, size: number = 10) => {
  return useQuery<WishListResponse, Error>({
    queryKey: ['wishList', page, size],
    queryFn: () => fetchWishList(localStorage.getItem('token') || '', page, size),
  });
};

export const useRemoveWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishId: number) => {
      return axios.delete(`${API_URL}/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
  });
};

export default fetchWishList;
