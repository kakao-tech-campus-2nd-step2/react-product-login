import { useQuery } from '@tanstack/react-query';

import { fetchRankingProduct } from '@/api/services/rankingProduct';
import { RankingFilter } from '@/types/productType';

export const useRankProducts = (filter: RankingFilter) => {
  return useQuery({
    queryKey: ['rankProducts', filter],
    queryFn: () => fetchRankingProduct(filter),
  });
};
