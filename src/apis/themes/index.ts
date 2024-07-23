import { ThemeProductsRequest } from '@internalTypes/requestTypes';
import { ThemeProductsResponse, ThemesResponse } from '@internalTypes/responseTypes';
import axiosInstance from '../instance';
import { THEME_PATHS } from './path';

export const getThemes = async (): Promise<ThemesResponse> => {
  const res = await axiosInstance.get<ThemesResponse>(THEME_PATHS.THEMES);
  return res.data;
};

export const getThemesProducts = async (params?: ThemeProductsRequest): Promise<ThemeProductsResponse> => {
  if (!params) throw new Error('params is required');
  const { themeKey, pageToken, maxResults } = params;
  const queryParams = { pageToken, maxResults };

  const res = await axiosInstance.get<ThemeProductsResponse>(THEME_PATHS.THEME_PRODUCTS(themeKey), {
    params: queryParams,
  });
  return res.data;
};
