import { BASE_URL } from '@/api/config';

import { ProductsRequestParams } from './themeProduct/types';

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;

export const getProductDetailPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}`;

export const getProductOptionsPath = (productId: string) =>
  `${BASE_URL}/api/products/${productId}/options`;

export const getProductsPath = ({
  categoryId,
  pageToken,
  maxResults,
}: ProductsRequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};
