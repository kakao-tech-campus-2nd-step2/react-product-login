import { useMutation } from '@tanstack/react-query';

import type { UserData, UserResponseData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export const getRegisterPath = () => `${BASE_URL}/api/members/register`;

export const postRegister = async (req: UserData): Promise<UserResponseData> => {
  const response = await fetchInstance.post<UserResponseData>(getRegisterPath(), req);
  return response.data;
};

export const FetchRegister = (req: UserData) =>
  useMutation({ mutationFn: () => postRegister(req) });
