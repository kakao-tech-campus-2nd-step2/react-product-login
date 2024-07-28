import type { UseAxiosMutationResult } from '@/api';
import { useAxiosMutation } from '@/api';
import { vercelApiWithAuth } from '@/api/axiosInstance';
import type { PostWishesRequestBody, PostWishesResponseBody } from '@/api/type';
import { authSessionStorage } from '@/utils/storage';

export function getPostWishesPath(): string {
  return '/api/wishes';
}

function usePostWishes(): UseAxiosMutationResult<PostWishesResponseBody, PostWishesRequestBody> {
  const token = authSessionStorage.get() ?? '';

  return useAxiosMutation<PostWishesResponseBody, PostWishesRequestBody>(
    {
      method: 'POST',
      url: getPostWishesPath(),
    },
    vercelApiWithAuth(token),
    [['wishes']],
  );
}

export default usePostWishes;
