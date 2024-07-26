import type { UseAxiosMutationResult } from '@/api';
import { useAxiosMutation } from '@/api';
import { vercelApiWithAuth } from '@/api/axiosInstance';
import type { PostWishesRequestBody, PostWishesResponseBody } from '@/api/type';

export function getPostWishesPath(): string {
  return '/api/wishes';
}

function usePostWishes(): UseAxiosMutationResult<PostWishesResponseBody, PostWishesRequestBody> {
  return useAxiosMutation<PostWishesResponseBody, PostWishesRequestBody>(
    {
      method: 'POST',
      url: getPostWishesPath(),
    },
    vercelApiWithAuth,
  );
}

export default usePostWishes;
