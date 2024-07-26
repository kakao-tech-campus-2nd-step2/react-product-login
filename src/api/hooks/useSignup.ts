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

export const getUserSignupPath = () => `${BASE_URL}/api/members/login`;

export const postSignup = async (userData: UserRequestData) => {
  const response = await fetchInstance.post<UserResponseData>(getUserSignupPath(), userData);
  return response.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (userData: Props) => postSignup(userData),
  });
};
