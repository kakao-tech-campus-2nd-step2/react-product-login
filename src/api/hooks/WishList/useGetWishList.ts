import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { BASE_URL } from '@/api/instance';

const token = sessionStorage.getItem('token');

export const getWishPath = () => {
  return `${BASE_URL}/api/wishes?page=0&size=10&sort=createdDate,desc`;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getWish = async () => {
  const response = await apiClient.get(getWishPath());
  return response.data.content;
};

export const useGetWishList = () => {
  return useQuery({
    queryKey: ['getWishList'],
    queryFn: getWish,
  });
};
