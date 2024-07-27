import { useMutation } from '@tanstack/react-query';

import type { UserAccountInput } from '@/types';

import { BASE_URL, fetchInstance } from '../instance';

// 해당 코드 부분은 코드의 통일성을 위하여 해당 패턴으로 작성하였습니다.

export const getPostUserJoinPath = () => `${BASE_URL}/api/members/register`;

export const postUserJoin = async (userInput: UserAccountInput) => {
  const response = await fetchInstance.post(getPostUserJoinPath(), userInput);

  return response.data;
};

export const usePostUserJoin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (
    data: unknown,
    variables: UserAccountInput,
    context: unknown,
  ) => Promise<unknown> | void;
  onError?: (error: Error, variables: UserAccountInput, context: unknown) => void;
}) => {
  return useMutation({
    mutationKey: [getPostUserJoinPath()],
    mutationFn: (userInput: UserAccountInput) => postUserJoin(userInput),
    onSuccess,
    onError,
  });
};
