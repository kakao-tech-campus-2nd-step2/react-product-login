import { useAxiosMutation, type UseAxiosMutationResult } from '@/api';
import type { PostRegisterRequestBody, PostRegisterResponseBody } from '@/api/type';

export function getRegisterPath(): string {
  return '/api/register';
}

function usePostRegister(): UseAxiosMutationResult<
  PostRegisterResponseBody,
  PostRegisterRequestBody
> {
  return useAxiosMutation<PostRegisterResponseBody, PostRegisterRequestBody>({
    method: 'POST',
    url: getRegisterPath(),
  });
}

export default usePostRegister;
