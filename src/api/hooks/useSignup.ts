import { useMutation } from "@tanstack/react-query";

import { BASE_URL, fetchInstance } from "../instance";

export type RegisterRequestParams = {
  email: string;
  password: string;
};

export type RegisterResponseData = {
  email: string;
  token: string;
};

const registerPath = `${BASE_URL}/api/members/register`;

const getSignUp = async (params: RegisterRequestParams) => {
  const response = await fetchInstance.post<RegisterResponseData>(registerPath, params);

  return response.data;
};

export const useSignUp = () => {
  return useMutation<RegisterResponseData, Error, RegisterRequestParams>({
    mutationFn: (params: RegisterRequestParams) => getSignUp(params),
  });
};
