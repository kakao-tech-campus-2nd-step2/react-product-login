import { ProductsRequestParams } from './themeProduct/types';
import { WishListRequestParams } from './wish/types';

export const getCategoriesPath = () =>
  `${process.env.VITE_API_BASE_URL}/api/categories`;

export const getProductDetailPath = (productId: string) =>
  `${process.env.VITE_API_BASE_URL}/api/products/${productId}`;

export const getProductOptionsPath = (productId: string) =>
  `${process.env.VITE_API_BASE_URL}/api/products/${productId}/options`;

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

  return `${process.env.VITE_API_BASE_URL}/api/products?${params.toString()}`;
};

export const getLoginPath = () =>
  `${process.env.VITE_API_BASE_URL}/api/members/login`;
export const getRegisterPath = () =>
  `${process.env.VITE_API_BASE_URL}/api/members/register`;

export const getWishAddPath = () =>
  `${process.env.VITE_API_BASE_URL}/api/wishes`;
export const getWishDeletePath = (wishId: string) =>
  `${process.env.VITE_API_BASE_URL}/api/wishes/${wishId}`;
export const getWishListPath = ({
  pageToken,
  maxResults,
}: WishListRequestParams) => {
  const params = new URLSearchParams();

  params.append('sort', 'createdDate,desc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${process.env.VITE_API_BASE_URL}/api/wishes?${params.toString()}`;
};
