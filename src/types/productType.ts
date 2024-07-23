export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
};

export type RankingFilter = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};
