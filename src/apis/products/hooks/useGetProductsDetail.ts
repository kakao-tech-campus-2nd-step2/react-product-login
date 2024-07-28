import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductDetailRequest } from '@internalTypes/requestTypes';
import { ProductDetailResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';
import axiosInstance from '@apis/instance';
import { PRODUCTS_PATHS } from '../path';

const getProductsDetail = async (params: ProductDetailRequest): Promise<ProductDetailResponse> => {
  const { productId } = params;
  const res = await axiosInstance.get<ProductDetailResponse>(PRODUCTS_PATHS.PRODUCTS_DETAIL(productId));

  return res.data;
};

export const useGetProductsDetail = ({ productId }: ProductDetailRequest) =>
  useSuspenseQuery<ProductDetailResponse, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductsDetail({ productId }),
  });
