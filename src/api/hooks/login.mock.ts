import { rest } from 'msw';

import type { UserRequestData, UserResponseData } from '@/types';

import { getLoginPath } from './useGetLogin';

export const loginMockHandler = [
  rest.post(getLoginPath(), (req, res, ctx) => {
    const { email, password } = req.body as UserRequestData;

    if (email === '123' && password === '123') {
      const mockResponse: UserResponseData = {
        email,
        token: 'mock-token',
      };

      return res(ctx.status(200), ctx.json(mockResponse));
    }

    return res(ctx.status(403), ctx.json({ error: 'Invalid email or password' }));
  }),
];
