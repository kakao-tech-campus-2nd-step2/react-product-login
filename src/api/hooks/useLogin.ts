import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export type UserRequestData = {
  email: string;
  password: string;
};

type Props = UserRequestData;

export type UserResponseData = {
  email: string;
  token: string;
};

export const getUserLoginPath = () => `${BASE_URL}/api/members/login`;

export const postLogin = async (userData: UserRequestData) => {
  const response = await fetchInstance.post<UserResponseData>(getUserLoginPath(), userData);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (userData: Props) => postLogin(userData),
  });
};
