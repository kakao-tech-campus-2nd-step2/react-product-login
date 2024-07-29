import { useMutation } from '@tanstack/react-query';

import type { LoginResponseData } from '@/types';
import type { LoginData } from '@/types';
import { authSessionStorage } from '@/utils/storage';

import { BASE_URL, fetchInstance } from '../instance';

export const postMembershipPath = () => `${BASE_URL}/api/register`;

export const postMembership = async ({ email, password }: LoginData) => {
  const response = await fetchInstance.post<LoginResponseData>(postMembershipPath(), {
    email,
    password,
  });
  return response.data;
};

export const usePostMembership = () => {
  return useMutation<LoginResponseData, Error, LoginData>({
    mutationFn: postMembership,
    onSuccess: (data) => {
      authSessionStorage.set({ email: data.email, token: data.token });
    },
  });
};
