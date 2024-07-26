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

export const useWishList = (page: number = 0, size: number = 10) => {
  const fetchWishList = async (): Promise<WishListResponse> => {
    const response = await axios.get(
      `${API_URL}/wishes?page=${page}&size=${size}&sort=createdDate,desc`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return response.data;
  };

  return useQuery<WishListResponse, Error>({
    queryKey: ['wishList', page, size],
    queryFn: fetchWishList,
  });
};

export const useRemoveWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishId: number) =>
      axios.delete(`${API_URL}/wishes/${wishId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
  });
};
