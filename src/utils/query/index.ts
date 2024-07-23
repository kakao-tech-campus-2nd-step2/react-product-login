import { axiosInstance, replacePathParams } from '@utils/network';
import LegacyRequestURLs from '@constants/LegacyRequestURLs';
import { ProductDetailResponse, RankingProductsResponse, ThemesResponse } from '@/types/response';
import { RankFilter, TargetFilter, ThemeDataRepository } from '@/types';

export const fetchThemes = async () => {
  const response = await axiosInstance.get<ThemesResponse>(LegacyRequestURLs.THEMES);
  const tmpThemes: ThemeDataRepository = {};

  if (response.data.themes) {
    response.data.themes.forEach((theme) => {
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
