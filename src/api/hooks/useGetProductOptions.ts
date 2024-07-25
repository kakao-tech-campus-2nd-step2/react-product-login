import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';
import type { ProductOptionsResponseData } from './productOptions.mock';
import { getProductOptionsPath } from './productOptionsPath';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

// 데이터 가져오는 함수
export const getProductOptions = async ({ productId }: Props): Promise<ProductOptionsResponseData> => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    getProductOptionsPath(productId)
  );
  return response.data;
};

// React Query 훅
export const useGetProductOptions = (
  params: Props,
  options?: UseQueryOptions<ProductOptionsResponseData, Error>
): UseQueryResult<ProductOptionsResponseData, Error> => {
  return useQuery({
    ...options,
    queryKey: [getProductOptionsPath(params.productId)],
    queryFn: () => getProductOptions(params),
    enabled: !!params.productId, // productId가 있을 때만 쿼리 활성화
    retry: false,
  });
};
