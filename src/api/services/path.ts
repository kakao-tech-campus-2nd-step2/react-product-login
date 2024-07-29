import { ProductsRequestParams } from './themeProduct/types';
import { WishListRequestParams } from './wish/types';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const getCategoriesPath = () => `${baseURL}/api/categories`;

export const getProductDetailPath = (productId: string) =>
  `${baseURL}/api/products/${productId}`;

export const getProductOptionsPath = (productId: string) =>
  `${baseURL}/api/products/${productId}/options`;

export const getProductsPath = ({
  categoryId,
  pageToken,
  maxResults,
}: ProductsRequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId.toString());
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${baseURL}/api/products?${params.toString()}`;
};

export const getLoginPath = () => `${baseURL}/api/members/login`;
export const getRegisterPath = () => `${baseURL}/api/members/register`;

export const getWishAddPath = () => `${baseURL}/api/wishes`;
export const getWishDeletePath = (wishId: string) =>
  `${baseURL}/api/wishes/${wishId}`;
export const getWishListPath = ({
  pageToken,
  maxResults,
}: WishListRequestParams) => {
  const params = new URLSearchParams();

  params.append('sort', 'createdDate,desc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${baseURL}/api/wishes?${params.toString()}`;
};
