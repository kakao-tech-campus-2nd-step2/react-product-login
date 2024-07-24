import { AxiosError } from 'axios';

import { getErrorMessage } from './errorHandler';
import { initInstance } from './instance';

// 나중에 수정하기
export const tempBaseUrl = 'https://api.example.com';

export const BACKEND_API = initInstance({
  baseURL: tempBaseUrl,
});

BACKEND_API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError = new Error(getErrorMessage(error));
    return Promise.reject(customError);
  }
);

export const BASE_URL =
  import.meta.env.VITE_API_MOCKING === 'enable'
    ? 'https://api.example.com'
    : tempBaseUrl;
