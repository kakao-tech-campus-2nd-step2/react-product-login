import { fetchInstance } from '@/api/instance';

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetchInstance.post('/api/members/register', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다.');
  }
};
