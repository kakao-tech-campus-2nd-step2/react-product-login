import { useMutation } from '@tanstack/react-query';

import type { UserRequestData, UserResponseData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export const getLoginPath = () => `${BASE_URL}/api/members/login`;

export const loginUser = async (userData: UserRequestData) => {
  const response = await fetchInstance.post<UserResponseData>(getLoginPath(), userData);
  return response.data;
};

type Props = UserRequestData;

export const useLogin = () => {
  return useMutation({
    mutationFn: (userData: Props) => loginUser(userData),
  });
};
