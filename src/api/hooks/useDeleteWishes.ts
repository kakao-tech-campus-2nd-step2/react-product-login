import type { UseAxiosMutationResult } from '@/api';
import { useAxiosMutation } from '@/api';
import { vercelApiWithAuth } from '@/api/axiosInstance';
import type { DeleteWishesRequestBody } from '@/api/type';

export function getDeleteWishesPath({ wishId }: DeleteWishesRequestBody): string {
  return `/api/wishes/${wishId}`;
}

function useDeleteWishes(): UseAxiosMutationResult<void, DeleteWishesRequestBody> {
  return useAxiosMutation<void, DeleteWishesRequestBody>(
    {
      method: 'DELETE',
    },
    vercelApiWithAuth,
    getDeleteWishesPath,
  );
}

export default useDeleteWishes;
