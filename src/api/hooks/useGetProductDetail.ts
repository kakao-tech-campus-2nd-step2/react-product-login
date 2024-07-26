import { useSuspenseQuery } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetail = async (params: ProductDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    ApiPath.products.detail(params.productId),
  );

  return response.data;
};

export const useGetProductDetail = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [ApiPath.products.detail(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
};
