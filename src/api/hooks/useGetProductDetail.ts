import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:3000';

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export interface ProductDetailRequestParams {
  productId: number;
}

const fetchProductDetail = async ({
  productId,
}: ProductDetailRequestParams): Promise<ProductDetail> => {
  const response = await fetch(`${BASE_URL}/api/products/${productId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product detail');
  }

  return response.json();
};

export const useGetProductDetail = (
  { productId }: ProductDetailRequestParams,
  options?: Omit<
    UseQueryOptions<ProductDetail, Error, ProductDetail, [string, number]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail({ productId }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
