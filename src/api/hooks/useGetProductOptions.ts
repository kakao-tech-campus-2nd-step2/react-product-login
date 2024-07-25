import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance'; // 실제 API 통신을 위한 fetchInstance 
import type { ProductOptionsResponseData } from './productOptions.mock'; // 타입 공유
import { getProductOptionsPath } from './productOptionsPath'; // path 생성 함수 공유

type Props = {
  productId: string;
};

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
    queryKey: [getProductOptionsPath(params.productId)], // 쿼리 키에 동적 productId 포함
    queryFn: () => getProductOptions(params),
    enabled: !!params.productId, // productId가 있을 때만 쿼리 활성화
    retry: false,
  });
};
