import { useSuspenseQuery } from '@tanstack/react-query';

import type { ProductOptionsData } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

// 제품 옵션 API 경로 생성
export const getProductOptionsPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}/options`;

// 제품 옵션 가져오기
export const getProductOptions = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    getProductOptionsPath(params.productId)
  );
  return response.data;
};

// 제품 옵션 훅
export const useGetProductOptions = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId)],
    queryFn: () => getProductOptions({ productId }),
  });
};
