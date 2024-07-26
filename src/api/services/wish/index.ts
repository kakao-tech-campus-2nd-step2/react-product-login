import { BACKEND_API } from '@/api/config';
import { getWishPath } from '@/api/services/path';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { Wish } from '@/types/wishType';

export type WishRequestBody = {
  productId: string;
};

export type WishResponse = Wish;

export const AddWish = async ({ productId }: WishRequestBody) => {
  try {
    const response = await BACKEND_API.post<WishResponse>(getWishPath(), {
      productId,
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
