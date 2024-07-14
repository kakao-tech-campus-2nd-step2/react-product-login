import { useEffect, useState } from 'react';

import type { GoodsData, RankingFilterOption } from '@/types';

import { fetchInstance } from '../instance';

export type RankingProductsResponseData = {
  products: GoodsData[];
};

const getRankingProductsPath = ({ targetType, rankType }: RankingFilterOption) =>
  `/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`;

export const getRankingProducts = async (filterOption: RankingFilterOption) => {
  const response = await fetchInstance.get<RankingProductsResponseData>(
    getRankingProductsPath(filterOption),
  );
  return response.data;
};

export const useGetRankingProducts = (filterOptions: RankingFilterOption) => {
  const [data, setData] = useState<RankingProductsResponseData | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getRankingProducts(filterOptions);

        setData(response);
        setLoading(false);
      } catch {
        setError(true);
        setData(undefined);
      }
    };

    fetchData();
  }, [filterOptions]);

  return {
    data,
    isLoading,
    isError,
  };
};
