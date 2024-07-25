import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import type { ProductDetailResponseData } from './productDetail.mock';
import { getProductDetailPath } from './productDetailPath';

export type ProductDetailRequestParams = {
  productId: string;
};

// 실제 API 호출 함수
export const getProductDetail = async ({ productId }: ProductDetailRequestParams): Promise<ProductDetailResponseData> => {
  const response = await fetchInstance.get<ProductDetailResponseData>(getProductDetailPath(productId));
  return response.data;
};

export const useGetProductDetail = ({ productId }: ProductDetailRequestParams) => {
  return useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
};
