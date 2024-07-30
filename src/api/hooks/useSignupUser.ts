import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { fetchInstance } from '../instance';

type SignupParams = {
  id: string;
  email: string;
  password: string;
};

type SignupResponseData = {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
  };
};

const signupUser = async (params: SignupParams): Promise<SignupResponseData> => {
  const response: AxiosResponse<SignupResponseData> = await fetchInstance.post(
    `/api/signup`,
    params,
  );
  return response.data;
};

export const useSignupUser = (): UseMutationResult<SignupResponseData, unknown, SignupParams> => {
  return useMutation({
    mutationFn: signupUser,
  });
};
