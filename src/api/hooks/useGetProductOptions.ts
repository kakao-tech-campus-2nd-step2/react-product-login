import { useSuspenseQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

import type { ProductOptionsData } from '@/types';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export const getProductOptionsPath = (productId: string) => `${BASE_URL}/api/products/${productId}/options`;

export const getProductOptions = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(getProductOptionsPath(params.productId));
  return response.data;
};

export const useGetProductOptions = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId)],
    queryFn: () => getProductOptions({ productId }),
  });
};
