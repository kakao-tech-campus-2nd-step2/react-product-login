import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

import { LoginRequestBody, LoginResponse } from './login';

export type RegisterRequestBody = LoginRequestBody;
export type RegisterResposne = LoginResponse;

export const register = async ({ email, password }: RegisterRequestBody) => {
  try {
    const response = await BACKEND_API.post<RegisterResposne>(
      '/api/members/register',
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
