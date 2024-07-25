import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import {
  CategoryResponse,
  ProductDetailResponse,
} from '@/types/response';
import { CategoryRepository } from '@/types';
import { ProductData } from '@/dto';

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
