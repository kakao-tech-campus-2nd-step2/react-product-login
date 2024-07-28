import axios, { AxiosResponse, AxiosError } from 'axios';
import { GetWishesRequest } from '@internalTypes/requestTypes';
import { GetWishesResponse } from '@internalTypes/responseTypes';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { WISH_PATHS } from '../path';

const getWishes = async (params: GetWishesRequest): Promise<GetWishesResponse> => {
  const { page, size, sort } = params;
  const res: AxiosResponse<GetWishesResponse> = await axios.get(WISH_PATHS.GET_WISH, {
    params: { page, size, sort },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

export default getWishes;

export const useGetWishes = (params: GetWishesRequest): UseQueryResult<GetWishesResponse, AxiosError> =>
  useQuery<GetWishesResponse, AxiosError>({
    queryKey: ['wishes', params],
    queryFn: () => getWishes(params),
  });
