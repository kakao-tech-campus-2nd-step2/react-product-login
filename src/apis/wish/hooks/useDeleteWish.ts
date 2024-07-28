import axios, { AxiosResponse, AxiosError } from 'axios';
import { DeleteWishRequest } from '@internalTypes/requestTypes';
import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { WISH_PATHS } from '../path';

const deleteWish = async ({ wishId }: DeleteWishRequest): Promise<void> => {
  await axios.delete(`${WISH_PATHS.DELETE_WISH}/${wishId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};

const useDeleteWish = (
  options?: UseMutationOptions<void, AxiosError, DeleteWishRequest>,
): UseMutationResult<void, AxiosError, DeleteWishRequest> =>
  useMutation<void, AxiosError, DeleteWishRequest>({
    mutationFn: deleteWish,
    ...options,
  });

export default useDeleteWish;
