import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:3000';

export interface ProductOption {
  id: number;
  name: string;
  quantity: number;
  productId: number;
}

export interface ProductOptionsRequestParams {
  productId: number;
}

const fetchProductOptions = async ({
  productId,
}: ProductOptionsRequestParams): Promise<ProductOption[]> => {
  const response = await fetch(`${BASE_URL}/api/products/${productId}/options`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product options');
  }

  return response.json();
};

export const useGetProductOptions = (
  { productId }: ProductOptionsRequestParams,
  options?: Omit<
    UseQueryOptions<ProductOption[], Error, ProductOption[], [string, number]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['productOptions', productId],
    queryFn: () => fetchProductOptions({ productId }),
    ...options,
  });
};
