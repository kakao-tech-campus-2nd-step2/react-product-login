import { rest } from 'msw';

import { type RegisterData } from '@/types';

import { getRegisterPath } from './usePostRegister';

export const usersMockHandler = [
  rest.post<RegisterData>(getRegisterPath(), async (req, res, ctx) => {
    let email;
    await req.json().then((data) => {
      email = data.email;
    });
    return res(ctx.json([{ email: email, token: 'testtoken' }]));
  }),
];
