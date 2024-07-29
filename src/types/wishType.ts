import { ProductData } from './productType';

export type Wish = {
  id: number;
  productId: number;
};

export type WishData = {
  id: number;
  product: Omit<ProductData, 'categoryId'>;
};
