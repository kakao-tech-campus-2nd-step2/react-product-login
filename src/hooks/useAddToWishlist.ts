import axios from 'axios';
import { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useAddToWishlist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const addToWishlist = async (productId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/wishes`, { productId });
      setLoading(false);
      alert('관심 등록 완료');
      return response.data;
    } catch (err) {
      setLoading(false);
      setError('관심 등록 실패. 다시 시도해주세요.');
      console.error('Wishlist error:', err);
      alert('관심 등록 실패. 다시 시도해주세요.');
    }
  };

  return { addToWishlist, loading, error };
};
