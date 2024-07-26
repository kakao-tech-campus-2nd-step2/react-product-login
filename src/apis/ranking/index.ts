import { RankingProductsRequest } from '@internalTypes/requestTypes';
import { RankingProductsResponse } from '@internalTypes/responseTypes';
import axiosInstance from '../instance';
import { RANKING_PATHS } from './path';

export const getRankingProducts = async (params?: RankingProductsRequest): Promise<RankingProductsResponse> => {
  const res = await axiosInstance.get<RankingProductsResponse>(RANKING_PATHS.PRODUCTS, { params });
  return res.data;
};
