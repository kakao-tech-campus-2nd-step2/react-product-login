import { useParams } from 'react-router-dom';
import { useGetProductsDetail } from '@apis/products/hooks/useGetProductsDetail';
import { useGetProductsOption } from '@apis/products/hooks/useGetProductsOption';
import { ProductDetailResponse, ProductOptionResponse } from '@internalTypes/responseTypes';

interface UseProductDataResult {
  productDetailData?: ProductDetailResponse;
  productOptionData?: ProductOptionResponse;
}

export default function useProductData(): UseProductDataResult {
  const { productId } = useParams<{ productId: string }>();

  const { data: productDetailData } = useGetProductsDetail({ productId });

  const { data: productOptionData } = useGetProductsOption({ productId });

  return { productDetailData, productOptionData };
}
