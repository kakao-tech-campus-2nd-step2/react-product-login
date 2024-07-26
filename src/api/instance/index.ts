import { authSessionStorage } from '@/utils/storage';

import { QueryClient } from '@tanstack/react-query';

import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};
export const BASE_URL = 'https://api.example.com';
// TODO: 추후 서버 API 주소 변경 필요
export const fetchInstance = initInstance({
  baseURL: 'https://api.example.com',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

const initFetchWithTokenInstance = () => {
  const instance = initInstance({
    baseURL: BASE_URL,
  });

  instance.interceptors.request.use((config) => {
    const token = authSessionStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const fetchWithTokenInstance = initFetchWithTokenInstance();
