import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

import { GetProductsRequest, GetProductsResponse } from './types';

export const fetchThemeProduct = async (
  themeKey: string,
  pageParam: number,
  maxResults: number
) => {
  try {
    const params: GetProductsRequest = {
      pageToken: pageParam.toString(),
      maxResults,
    };

    const response = await BACKEND_API.get<GetProductsResponse>(
      `/api/v1/themes/${themeKey}/products`,
      { params }
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
