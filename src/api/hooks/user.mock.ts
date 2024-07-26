import { rest } from 'msw';

import { getPostUserJoinPath } from './usePostUserJoin';

export const userMockhandler = [
  rest.post(getPostUserJoinPath(), (_, res, ctx) => {
    console.log(_);
    return res(ctx.json(USER_MOCK_DATA));
  }),
];

const USER_MOCK_DATA = {
  email: 'example@example.com',
  token: 'string',
};
