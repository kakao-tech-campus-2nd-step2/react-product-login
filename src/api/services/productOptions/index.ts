import { BACKEND_API } from '@/api/config';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

import { GetProductOptionsResponse } from './types';

export const fetchProductOptions = async (productId: number) => {
  try {
    const response = await BACKEND_API.get<GetProductOptionsResponse>(
      `/api/v1/products/${productId}/options`
    );
    return response.data.options;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
