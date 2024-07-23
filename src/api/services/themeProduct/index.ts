import { BACKEND_API } from '@/api/config';
import { getProductsPath } from '@/api/services/path';

import {
  ProductsRequestParams,
  ProductsResponse,
  ProductsResponseRaw,
} from './types';

export const fetchThemeProduct = async (
  params: ProductsRequestParams
): Promise<ProductsResponse> => {
  const response = await BACKEND_API.get<ProductsResponseRaw>(
    getProductsPath(params)
  );
  const { data } = response;

  return {
    products: data.content,
    nextPageToken:
      data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};
