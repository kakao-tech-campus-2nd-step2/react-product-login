import { rest } from 'msw';

import { ERROR_MESSAGES, ErrorCode } from '@/constants/errorCodes';

import { BASE_URL } from '../instance';

interface LoginRequestBody {
  email: string;
  password: string;
}

export const authMockHandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequestBody;

    if (email === '1234@kakao.com' && password === '1234') {
      return res(
        ctx.status(200),
        ctx.json({
          email: '1234@kakao.com',
          token: 'abcdefg',
        }),
      );
    } else {
      return res(
        ctx.status(ErrorCode.Forbidden),
        ctx.json({
          message: ERROR_MESSAGES[ErrorCode.Forbidden],
        }),
      );
    }
  }),
  rest.post(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email && password) {
      return res(
        ctx.status(201),
        ctx.json({
          email,
          token: 'abcdefg',
        }),
      );
    } else {
      return res(
        ctx.status(ErrorCode.InvalidRequest),
        ctx.json({
          message: ERROR_MESSAGES[ErrorCode.InvalidRequest],
        }),
      );
    }
  }),
];
