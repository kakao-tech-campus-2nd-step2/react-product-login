import { useQuery } from '@tanstack/react-query';
import { ProductOptionsRequest } from '@internalTypes/requestTypes';
import { ProductOptionResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';
import axiosInstance from '@apis/instance';
import { PRODUCTS_PATHS } from '../path';

export const getProductsOptions = async (params?: ProductOptionsRequest): Promise<ProductOptionResponse> => {
  if (!params) throw new Error('params is required');
  const { productId } = params;
  const res = await axiosInstance.get<ProductOptionResponse>(PRODUCTS_PATHS.PRODUCTS_OPTIONS(productId));

  return res.data;
};

export const useGetProductsOption = ({ productId }: ProductOptionsRequest) =>
  useQuery<ProductOptionResponse, AxiosError>({
    queryKey: ['productOption', productId],
    queryFn: () => getProductsOptions({ productId }),
  });
