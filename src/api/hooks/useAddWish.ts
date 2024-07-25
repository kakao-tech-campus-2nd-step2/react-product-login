import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export const addWishListPath = () => `${BASE_URL}/api/wishes`;

export const addWishList = async ({ productId }: Props) => {
  return fetchInstance.post(addWishListPath(), {
    productId: productId,
  });
};

export const useAddWishList = ({ productId }: Props) => {
  return useMutation({
    mutationFn: () => addWishList({ productId }),
    onSuccess: () => {
      alert('관심 등록 완료');
    },
    onError: () => {
      console.error('에러 발생');
    },
  });
};
