import { ProductsRequestParams } from './themeProduct/types';
import { WishListRequestParams } from './wish/types';

const BASE_URL = 'https://api.example.com';

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

export const getLoginPath = () => `${BASE_URL}/api/members/login`;
export const getRegisterPath = () => `${BASE_URL}/api/members/register`;

export const getWishAddPath = () => `${BASE_URL}/api/wishes`;
export const getWishDeletePath = (wishId: number) =>
  `${BASE_URL}/api/wishes/${wishId}`;
export const getWishDeleteApi = `${BASE_URL}/api/wishes/:wishId`;
export const getWishListPath = ({
  pageToken,
  maxResults,
}: WishListRequestParams) => {
  const params = new URLSearchParams();

  params.append('sort', 'createdDate,desc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};
