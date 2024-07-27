import { ProductData } from './productType';

export type Wish = {
  id: number;
  productId: string;
};

export type WishData = {
  id: number;
  product: Omit<ProductData, 'categoryId'>;
};
