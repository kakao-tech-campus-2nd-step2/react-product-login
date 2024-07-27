import { AxiosError } from 'axios';

import { AuthInfo } from '@/provider/auth/AuthContext';

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

export const AUTHROIZATION_API = initInstance({
  baseURL: tempBaseUrl,
  withCredentials: true,
});
AUTHROIZATION_API.interceptors.request.use((request) => {
  const getAuthInfo = sessionStorage.getItem('authInfo');
  if (!getAuthInfo) {
    return Promise.reject(new Error('토큰이 없습니다.'));
  }

  const authInfo: AuthInfo = JSON.parse(getAuthInfo);
  request.headers.Authorization = `Bearer ${authInfo.token}`;

  return request;
});
