import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ERROR } from '@utils/constants/message';
import { QueryClient } from '@tanstack/react-query';

const statusMessages: { [key: number]: string } = {
  400: ERROR.DATA_FETCH,
  401: ERROR.UNAUTHORIZED,
  403: ERROR.FORBIDDEN,
  404: ERROR.NOT_FOUND,
  408: ERROR.TIMEOUT,
  409: ERROR.CONFLICT,
  500: ERROR.SERVER_ERROR,
};

export const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    baseURL: process.env.REACT_APP_BASE_URL,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  instance.interceptors.response.use(
    (res) => res,
    (e: AxiosError) => {
      if (e.response) {
        const message = statusMessages[e.response.status];
        e.message = message;
      }
      return Promise.reject(e);
    },
  );

  return instance;
};

const axiosInstance = initInstance({});

export const queryClient = new QueryClient();

export default axiosInstance;
