import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { RankingProductsResponse, ThemesResponse } from '@/types/response';
import { RankFilter, TargetFilter, ThemeDataRepository } from '@/types';

export const fetchThemes = async () => {
  const response = await axiosInstance.get<ThemesResponse>(RequestURLs.THEMES);
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
    .get<RankingProductsResponse>(RequestURLs.RANKING_PRODUCTS, { params });

  return response.data.products || [];
};
