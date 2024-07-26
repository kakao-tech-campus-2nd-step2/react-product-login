import { useMutation } from '@tanstack/react-query';

type RegisterRequestBody = {
  email: string;
  password: string;
};

type RegisterResponseBody = {
  email: string;
  token: string;
};

const register = async (registerData: RegisterRequestBody): Promise<RegisterResponseBody> => {
  const response = await fetch('http://localhost:3000/api/members/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error('Invalid input');
  }

  return response.json();
};

export const useRegister = () => {
  return useMutation<RegisterResponseBody, Error, RegisterRequestBody>(register);
};
