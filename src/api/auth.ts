import { fetchInstance } from './instance';

export const register = async (email: string, password: string) => {
  const response = await fetchInstance.post('/api/members/register', {
    email,
    password,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await fetchInstance.post('/api/members/login', {
    email,
    password,
  });
  return response.data;
};
