import { BACKEND_API } from '@/api/config';
import { getProductDetailPath } from '@/api/services/path';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { ProductData } from '@/types/productType';

export interface ProductDetailRequestParams {
  productId: number;
}

export type ProductDetailResponse = ProductData;

export const fetchProductDetail = async ({
  productId,
}: ProductDetailRequestParams) => {
  try {
    const response = await BACKEND_API.get<ProductDetailResponse>(
      getProductDetailPath(productId.toString())
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
