import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

// 해당 코드 부분은 코드의 통일성을 위하여 해당 패턴으로 작성하였습니다.

interface PostUserJoinResponse {
  email: string;
  password: string;
}

export const getPostUserJoinPath = () => `${BASE_URL}/api/members/register`;

export const postUserJoin = async (userInput: PostUserJoinResponse) => {
  const response = await fetchInstance.post(getPostUserJoinPath(), userInput);

  return response.data;
};

export const usePostUserJoin = () => {
  return useMutation({
    mutationKey: [getPostUserJoinPath()],
    mutationFn: (userInput: PostUserJoinResponse) => postUserJoin(userInput),
  });
};
