import { useMutation } from '@tanstack/react-query';

import type { LoginResponseData } from '@/types';
import type { LoginData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

import { BASE_URL, fetchInstance } from '../instance';

export const postLoginPath = () => `${BASE_URL}/api/login`;

export const postLogin = async ({ email, password }: LoginData) => {
  const response = await fetchInstance.post<LoginResponseData>(postLoginPath(), {
    email,
    password,
  });
  return response.data;
};

export const usePostLogin = () => {
  return useMutation<LoginResponseData, Error, LoginData>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      authSessionStorage.set({ email: data.email, token: data.token });
    },
  });
};
