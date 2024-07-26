import type { UseAxiosMutationResult } from '@/api';
import { useAxiosMutation } from '@/api';
import type { PostLoginRequestBody, PostLoginResponseBody } from '@/api/type';

export function getLoginPath(): string {
  return '/api/login';
}

function usePostLogin(): UseAxiosMutationResult<PostLoginResponseBody, PostLoginRequestBody> {
  return useAxiosMutation<PostLoginResponseBody, PostLoginRequestBody>({
    method: 'POST',
    url: getLoginPath(),
  });
}

export default usePostLogin;
