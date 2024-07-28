import type { UseQueryResult } from '@tanstack/react-query';

import { useAxiosQuery } from '@/api';
import type { GetProductsOptionResponseBody } from '@/api/type';

export function getProductsOptionPath(productsId: string): string {
  return `/api/products/${productsId}/options`;
}

function useGetProductsOption({
  productsId,
}: {
  productsId: string;
}): UseQueryResult<GetProductsOptionResponseBody> {
  return useAxiosQuery<GetProductsOptionResponseBody>(
    {
      method: 'GET',
      url: getProductsOptionPath(productsId),
    },
    ['productsOptions', productsId],
  );
}

export default useGetProductsOption;
