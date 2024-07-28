import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';

import { authSessionStorage } from '@/utils/storage';

import { BASE_URL, fetchInstance } from '../instance';

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  token: string;
}

interface ErrorResponse {
  message: string;
}

const login = async (params: LoginParams): Promise<LoginResponse> => {
  const { data } = await fetchInstance.post<LoginResponse>(`${BASE_URL}/api/members/login`, params);
  return data;
};

export const useLogin = () => {
  const [queryParams] = useSearchParams();

  const { mutate } = useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginParams>({
    mutationFn: login,
    onSuccess: (data) => {
      authSessionStorage.set(data.token);
      alert('로그인이 완료되었습니다.');
      const redirectUrl = queryParams.get('redirect') ?? window.location.origin;
      window.location.replace(redirectUrl);
    },
    onError: (error) => {
      alert(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
    },
  });

  return { mutate };
};
