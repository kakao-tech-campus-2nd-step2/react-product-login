import { ProductData, RankingFilter } from '@/types/productType';

export type GetProductRankingRequest = {
  targetType?: RankingFilter['targetType'];
  rankType?: RankingFilter['rankType'];
};

export type GetProductRankingResponse = {
  products: ProductData[];
};
