import { useMutation } from "@tanstack/react-query";

import { BASE_URL, fetchInstance } from "../instance";

export type LoginRequestParams = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  email: string;
  token: string;
};

const loginPath = `${BASE_URL}/api/members/login`;

const getLogin = async (params: LoginRequestParams) => {
  const response = await fetchInstance.post<LoginResponseData>(loginPath, params);

  return response.data;
};

export const useLogin = () => {
  return useMutation<LoginResponseData, Error, LoginRequestParams>({
    mutationFn: (params: LoginRequestParams) => getLogin(params),
  });
};
