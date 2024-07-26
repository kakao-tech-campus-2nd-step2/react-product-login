import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';
import { BASE_URL } from '../instance';

interface RegisterParams {
  email: string;
  password: string;
}

interface RegisterResponse {
  email: string;
  token: string;
}

interface ErrorResponse {
  message: string;
}

const register = async (params: RegisterParams): Promise<RegisterResponse> => {
  const { data } = await fetchInstance.post<RegisterResponse>(
    `${BASE_URL}/api/members/register`,
    params,
  );
  return data;
};

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError<ErrorResponse>, RegisterParams>({
    mutationFn: register,
    onSuccess: (data) => {
      authSessionStorage.set(data.token);
      alert('회원가입이 완료되었습니다.');
      window.location.replace('/');
    },
    onError: (error) => {
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    },
  });
};
