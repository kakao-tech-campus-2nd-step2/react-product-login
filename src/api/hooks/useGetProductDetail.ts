import { useSuspenseQuery } from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { getProductDetailPath } from './productDetail.mock';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

// 실제 API 호출 대신 모킹 데이터를 반환하는 함수
export const getProductDetail = async (params: ProductDetailRequestParams) => {
  const { productId } = params;
  if (productId === '1') {
    return {
      id: 1,
      name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
      price: 145000,
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      categoryId: 2920,
    };
  }
  throw new Error('Product not found');
};

export const useGetProductDetail = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }),
  });
};
