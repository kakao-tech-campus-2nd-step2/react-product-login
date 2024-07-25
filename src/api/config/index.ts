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
