import { useSuspenseQuery } from '@tanstack/react-query';

import {
  ProductDetailRequestParams,
  fetchProductDetail,
} from '@/api/services/productDetail';

export const useProductDetail = ({ productId }: ProductDetailRequestParams) => {
  return useSuspenseQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => fetchProductDetail({ productId }),
  });
};
