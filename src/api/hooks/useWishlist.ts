import { AxiosError } from 'axios'; // AxiosError 타입을 가져옵니다.
import { useEffect, useState } from 'react';

import { fetchWithTokenInstance } from '../instance';

interface Wish {
  id: number;
  product: {
    name: string;
  };
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<null | string>(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetchWithTokenInstance.get('/api/wishes')
      console.log('위시리스트 fetch response', response.data)
      setWishlist(response.data.content);
    } catch (error) {
      if (error instanceof AxiosError) {
        setFetchError(error.message || 'An error occurred');
      } else {
        setFetchError('An unexpected error occurred');
      }
      console.error('위시 리스트 fetch 에러', error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return { wishlist, loading, fetchError, fetchWishlist };
};

export const useAddToWishlist = (fetchWishlist: () => void) => {
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState<null | string>(null);

  const addToWishlist = async (productId: number) => {
    try {
      setLoading(true);
      const response = await fetchWithTokenInstance.post('/api/wishes', { productId });
      console.log('위시리스트 reponse add', response.data)
      await fetchWishlist();
    } catch (error) {
      if (error instanceof AxiosError) {
        setAddError(error.message || 'An error occurred');
      } else {
        setAddError('An unexpected error occurred');
      }
      console.error('위시리스트 에러 add', error)
    } finally {
      setLoading(false);
    }
  };

  return { addToWishlist, loading, addError };
};

export const useRemoveFromWishlist = (fetchWishlist: () => void) => {
  const [loading, setLoading] = useState(false);
  const [removeError, setRemoveError] = useState<null | string>(null);

  const removeFromWishlist = async (wishId: number) => {
    try {
      setLoading(true);
      await fetchWithTokenInstance.delete(`/api/wishes/${wishId}`);
      await fetchWishlist();
    } catch (error) {
      if (error instanceof AxiosError) {
        setRemoveError(error.message || 'An error occurred');
      } else {
        setRemoveError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { removeFromWishlist, loading, removeError };
};
