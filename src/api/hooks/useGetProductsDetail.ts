import type { UseQueryResult } from '@tanstack/react-query';

import { useAxiosQuery } from '@/api';
import type { GetProductsDetailResponseBody } from '@/api/type';

export function getProductsDetailPath(productsId: string): string {
  return `/api/products/${productsId}`;
}

function useGetProductsDetail({
  productsId,
}: {
  productsId: string;
}): UseQueryResult<GetProductsDetailResponseBody> {
  return useAxiosQuery<GetProductsDetailResponseBody>(
    {
      method: 'GET',
      url: getProductsDetailPath(productsId),
    },
    ['products', productsId],
  );
}

export default useGetProductsDetail;
