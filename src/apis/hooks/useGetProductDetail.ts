import { useSuspenseQuery } from '@tanstack/react-query';
import type { ProductData } from '@internalTypes/dataTypes';
import axiosInstance from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetailPath = (productId: string) =>
  `${process.env.REACT_APP_BASE_URL}/api/products/${productId}`;

export const getProductDetail = async (params: ProductDetailRequestParams) => {
  const response = await axiosInstance.get<GoodsDetailResponseData>(getProductDetailPath(params.productId));

  return response.data;
};

export const useGetProductDetail = ({ productId }: Props) =>
  useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
