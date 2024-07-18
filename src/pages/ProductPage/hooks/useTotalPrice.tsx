import { useState } from 'react';

import { useProductDetail } from '@/api/hooks/useProductDetail';

export const useTotalPrice = (productId: number) => {
  const { productPrice } = useProductDetail(productId);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(productPrice);

  const updateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    setTotalPrice(productPrice * newQuantity);
  };

  return { quantity, totalPrice, updateQuantity };
};
