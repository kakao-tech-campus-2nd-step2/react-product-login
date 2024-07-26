import { useMutation } from '@tanstack/react-query';

import type { UserRequestData, UserResponseData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

type Props = UserRequestData;

export const getRegisterPath = () => `${BASE_URL}/api/members/register`;

export const registerUser = async (data: UserRequestData) => {
  const response = await fetchInstance.post<UserResponseData>(getRegisterPath(), data);
  return response.data;
};

export const useRegister = () =>
  useMutation({
    mutationFn: (userData: Props) => registerUser(userData),
  });
