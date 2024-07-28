import { useSuspenseQuery } from '@tanstack/react-query';
import type { ProductOptionsData } from '@internalTypes/dataTypes';
import type { ProductDetailRequestParams } from './useGetProductDetail';
import axiosInstance from '../instance';

type Props = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export const getProductOptionsPath = (productId: string) =>
  `${process.env.REACT_APP_BASE_URL}/api/products/${productId}/options`;

export const getProductOptions = async (params: ProductDetailRequestParams) => {
  const response = await axiosInstance.get<ProductOptionsResponseData>(getProductOptionsPath(params.productId));
  return response.data;
};

export const useGetProductOptions = ({ productId }: Props) =>
  useSuspenseQuery({
    queryKey: [getProductOptionsPath(productId)],
    queryFn: () => getProductOptions({ productId }),
  });
