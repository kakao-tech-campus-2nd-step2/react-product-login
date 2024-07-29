import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  token: string;
};

export const login = async ({ email, password }: LoginRequestBody) => {
  try {
    const response = await BACKEND_API.post<LoginResponse>(
      '/api/members/login',
      { email, password }
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
