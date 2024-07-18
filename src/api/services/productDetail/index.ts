import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

import { GetProductDetailResponse } from './types';

export const fetchProductDetail = async (productId: number) => {
  try {
    const response = await BACKEND_API.get<GetProductDetailResponse>(
      `/api/v1/products/${productId}/detail`
    );
    return response.data.detail;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
