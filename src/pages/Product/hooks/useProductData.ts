import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductsDetail, getProductsOptions } from '@apis/products';
import { ProductDetailResponse, ProductOptionResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';

interface UseProductDataResult {
  productDetailData?: ProductDetailResponse;
  productOptionData?: ProductOptionResponse;
}

export default function useProductData(): UseProductDataResult {
  const { productId } = useParams<{ productId: string }>();

  const { data: productDetailData } = useQuery<ProductDetailResponse, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductsDetail({ productId }),
  });

  const { data: productOptionData } = useQuery<ProductOptionResponse, AxiosError>({
    queryKey: ['productOption', productId],
    queryFn: () => getProductsOptions({ productId }),
  });

  return { productDetailData, productOptionData };
}
