import { useSuspenseQuery } from '@tanstack/react-query';

import {
  ProductOptionsRequestParams,
  fetchProductOptions,
} from '@/api/services/productOptions';

export const useProductOptions = ({
  productId,
}: ProductOptionsRequestParams) => {
  return useSuspenseQuery({
    queryKey: ['product', 'options', productId],
    queryFn: () => fetchProductOptions({ productId }),
  });
};
