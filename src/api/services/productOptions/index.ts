import { BACKEND_API } from '@/api/config';
import { getProductOptionsPath } from '@/api/services/path';
import { ProductDetailRequestParams } from '@/api/services/productDetail';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { ProductOptionsData } from '@/types/productType';

export interface ProductOptionsRequestParams
  extends ProductDetailRequestParams {}

type ProductOptionsResponse = ProductOptionsData[];

export const fetchProductOptions = async ({
  productId,
}: ProductOptionsRequestParams) => {
  try {
    const response = await BACKEND_API.get<ProductOptionsResponse>(
      getProductOptionsPath(productId.toString())
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
