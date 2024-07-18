import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchProductDetail } from '@/api/services/productDetail';

export const useProductDetail = (productId: number) => {
  const { data, status, error } = useSuspenseQuery({
    queryKey: ['product', 'detail', productId],
    queryFn: () => fetchProductDetail(productId),
  });

  const productDetail = {
    imageURL: data.imageURL,
    productName: data.name,
    price: data.price.sellingPrice,
  };

  const productPrice = data.price.sellingPrice;

  const orderProductDetail = {
    imageURL: data.imageURL,
    brandName: data.brandInfo.name,
    productName: data.name,
  };

  return { productDetail, status, error, productPrice, orderProductDetail };
};
