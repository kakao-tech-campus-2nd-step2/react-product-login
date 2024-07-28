import { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '@apis/instance';
import { AddWishRequest } from '@internalTypes/requestTypes';
import { AddWishResponse } from '@internalTypes/responseTypes';
import { WISH_PATHS } from '@apis/wish/path';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

const addWish = async (request: AddWishRequest): Promise<AddWishResponse> => {
  const res = await axiosInstance.post(WISH_PATHS.ADD_WISH, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};

export default function useAddWishMutation(): UseMutationResult<AddWishResponse, AxiosError, AddWishRequest> {
  return useMutation({ mutationFn: (productId: AddWishRequest) => addWish(productId) });
}
