import { rest } from 'msw';

import { type UserData } from '@/types';

import { getLoginPath } from './usePostLogin';
import { getRegisterPath } from './usePostRegister';

export const usersMockHandler = [
  rest.post<UserData>(getRegisterPath(), async (req, res, ctx) => {
    let email;
    await req.json().then((data) => {
      email = data.email;
    });
    return res(ctx.json([{ email: email, token: 'testtoken' }]));
  }),
  rest.post<UserData>(getLoginPath(), async (req, res, ctx) => {
    let email;
    await req.json().then((data) => {
      email = data.email;
    });
    return res(ctx.json([{ email: email, token: 'testtoken' }]));
  }),
];
