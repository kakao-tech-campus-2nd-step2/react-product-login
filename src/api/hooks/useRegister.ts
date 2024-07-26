import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:3000';

interface RegisterRequestBody {
  email: string;
  password: string;
}

interface RegisterSuccessResponse {
  email: string;
  token: string;
}

const register = async (registerData: RegisterRequestBody): Promise<RegisterSuccessResponse> => {
  const response = await fetch(`${BASE_URL}/api/members/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Get error details from the response
    throw new Error(errorData.message || 'Registration failed'); // Throw a specific error
  }

  return response.json();
};

export const useGetRegister = (
  options?: UseMutationOptions<RegisterSuccessResponse, Error, RegisterRequestBody>,
) => {
  return useMutation<RegisterSuccessResponse, Error, RegisterRequestBody>({
    mutationFn: register,
    ...options,
  });
};
