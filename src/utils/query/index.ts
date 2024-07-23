import { axiosInstance, replacePathParams } from '@utils/network';
import LegacyRequestURLs from '@constants/LegacyRequestURLs';
import RequestURLs from '@constants/RequestURLs';
import {
  CategoryResponse,
  ProductDetailResponse,
  RankingProductsResponse,
} from '@/types/response';
import { RankFilter, TargetFilter, ThemeDataRepository } from '@/types';

export const fetchThemes = async () => {
  const response = await axiosInstance.get<CategoryResponse>(RequestURLs.CATEGORY);
  const tmpThemes: ThemeDataRepository = {};

  if (response.data) {
    response.data.forEach((theme) => {
      tmpThemes[theme.key] = theme;
    });
  }

  return tmpThemes;
};

export const fetchProducts = async (params:
{ targetType: TargetFilter, rankType: RankFilter }) => {
  const response = await axiosInstance
    .get<RankingProductsResponse>(LegacyRequestURLs.RANKING_PRODUCTS, { params });

  return response.data.products || [];
};

export const fetchProductDetail = async ({ productId }: { productId: string }) => {
  const endpoint = replacePathParams(LegacyRequestURLs.PRODUCT_DETAILS, { productId });
  const response = await axiosInstance.get<ProductDetailResponse>(endpoint);

  return response.data.detail;
};
