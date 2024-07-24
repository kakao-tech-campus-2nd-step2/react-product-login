import { axiosInstance, replacePathParams } from '@utils/network';
import LegacyRequestURLs from '@constants/LegacyRequestURLs';
import RequestURLs from '@constants/RequestURLs';
import {
  CategoryResponse,
  ProductDetailResponse,
  RankingProductsResponse,
} from '@/types/response';
import { RankFilter, TargetFilter, CategoryRepository } from '@/types';
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

export const fetchProducts = async (params:
{ targetType: TargetFilter, rankType: RankFilter }) => {
  const response = await axiosInstance
    .get<RankingProductsResponse>(LegacyRequestURLs.RANKING_PRODUCTS, { params });

  return response.data.products || [];
};

export const fetchProductDetail = async ({ productId }: { productId: string }) => {
  const endpoint = replacePathParams(RequestURLs.PRODUCT_DETAILS, { productId });
  const response = await axiosInstance.get<ProductDetailResponse>(endpoint);

  return response.data as ProductData;
};
