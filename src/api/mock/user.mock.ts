import { rest } from 'msw';

import { getPostUserJoinPath } from '../hooks/usePostUserJoin';
import { getPostUserLoginPath } from '../hooks/userPostUserLogin';

export const userMockhandler = [
  rest.post(getPostUserJoinPath(), (_, res, ctx) => {
    return res(ctx.json(USER_MOCK_DATA));
  }),
  rest.post(getPostUserLoginPath(), (_, res, ctx) => {
    return res(ctx.json(USER_MOCK_DATA));
  }),
];

const USER_MOCK_DATA = {
  email: 'example@example.com',
  token: 'string',
};
