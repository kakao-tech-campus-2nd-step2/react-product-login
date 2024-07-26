import { useSuspenseQuery } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export const getProductOptions = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    ApiPath.products.options(params.productId),
  );
  return response.data;
};

export const useGetProductOptions = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [ApiPath.products.options(productId)],
    queryFn: () => getProductOptions({ productId }),
  });
};
