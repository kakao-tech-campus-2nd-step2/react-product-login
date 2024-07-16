import { AxiosError } from 'axios';

import { getErrorMessage } from './errorHandler';
import { initInstance } from './instance';

export const BACKEND_API = initInstance({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://react-gift-mock-api-ppochaco.vercel.app',
});

BACKEND_API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError = new Error(getErrorMessage(error));
    return Promise.reject(customError);
  }
);
