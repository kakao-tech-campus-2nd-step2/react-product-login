import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { LoginRequestBody } from '@/types/request';
import {
  CategoryResponse,
  LoginResponse,
  ProductDetailResponse,
} from '@/types/response';
import { CategoryRepository } from '@/types';
import { ProductData } from '@/dto';

export const requestAuth = async (body: LoginRequestBody, authType: 'login' | 'register') => {
  const url = authType === 'register' ? RequestURLs.REGISTER : RequestURLs.LOGIN;
  const response = await axiosInstance.post<LoginResponse>(url, body);

  return response.data;
};

export const fetchCategories = async () => {
  const response = await axiosInstance.get<CategoryResponse>(RequestURLs.CATEGORY);
  const tmpCategories: CategoryRepository = {};

  if (response.data) {
    response.data.forEach((category) => {
      tmpCategories[category.id] = category;
    });
  }

  return tmpCategories;
};

export const fetchProductDetail = async ({ productId }: { productId: string }) => {
  const endpoint = replacePathParams(RequestURLs.PRODUCT_DETAILS, { productId });
  const response = await axiosInstance.get<ProductDetailResponse>(endpoint);

  return response.data as ProductData;
};
