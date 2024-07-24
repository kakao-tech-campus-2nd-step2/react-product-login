import { useState } from 'react';

import { useProductDetail } from '@/api/hooks/useProductDetail';

export const useTotalPrice = (productId: string) => {
  const { data: productDetail } = useProductDetail({ productId });

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(productDetail.price);

  const updateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    setTotalPrice(productDetail.price * newQuantity);
  };

  return { quantity, totalPrice, updateQuantity };
};
