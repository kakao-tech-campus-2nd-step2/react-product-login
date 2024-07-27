import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { BASE_URL } from '@/api/instance';

const token = sessionStorage.getItem('token');

type PutWishProps = {
  productId: string;
};

export const putWishPath = () => {
  return `${BASE_URL}/api/wishes`;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const putWish = async ({ productId }: PutWishProps) => {
  const response = await apiClient.post(putWishPath(), { productId });
  return response.data;
};

export const usePutWishList = () => {
  return useMutation({
    mutationFn: putWish,
    onSuccess: () => {
      // Update wishlist in local storage or Redux state
    },
  });
};
