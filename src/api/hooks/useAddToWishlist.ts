import axios from 'axios';
import { useState } from 'react';

export const useAddToWishlist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const addToWishlist = async (productId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`http://localhost:3000/api/wishes`, { productId });
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
