import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

type LoginRequestBody = {
  email: string;
  password: string;
};

type LoginSuccessResponse = {
  email: string;
  token: string;
};

const BASE_URL = 'http://localhost:3000';

const login = async (loginData: LoginRequestBody): Promise<LoginSuccessResponse> => {
  const response = await fetch(`${BASE_URL}/api/members/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Invalid email or password');
    }
    throw new Error('An error occurred during login');
  }

  return response.json();
};

export const useLogin = (
  options?: UseMutationOptions<LoginSuccessResponse, Error, LoginRequestBody>,
) => {
  return useMutation<LoginSuccessResponse, Error, LoginRequestBody>({
    mutationFn: login,
    ...options,
  });
};
