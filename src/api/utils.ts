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

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetchInstance.post('/api/members/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw new Error('로그인에 실패했습니다.');
  }
};

export const addToWishlist = async (productId: string) => {
  try {
    const response = await fetchInstance.post('/api/wishes', { productId });

    return response.data;
  } catch (error) {
    throw new Error('위시 리스트 추가에 실패했습니다.');
  }
};

export const getWishlist = async (page: number, size: number) => {
  try {
    const response = await fetchInstance.get(`/api/wishes`, {
      params: {
        page,
        size,
        sort: 'createdDate,desc',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('위시 리스트 조회에 실패했습니다.');
  }
};

export const deleteFromWishlist = async (productId: number) => {
  try {
    const response = await fetchInstance.delete(`/api/wishes/${productId}`);

    return response.data;
  } catch (error) {
    throw new Error('위시 리스트 삭제에 실패했습니다.');
  }
};
