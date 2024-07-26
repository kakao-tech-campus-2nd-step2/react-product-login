import { useMutation } from '@tanstack/react-query';

import type { RegisterData, RegisterResponseData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

export const getRegisterPath = () => `${BASE_URL}/api/members/register`;

export const postRegister = async (req: RegisterData): Promise<RegisterResponseData> => {
  const response = await fetchInstance.post<RegisterResponseData>(getRegisterPath(), req);
  return response.data;
};

export const FetchRegister = (req: RegisterData) =>
  useMutation({ mutationFn: () => postRegister(req) });
