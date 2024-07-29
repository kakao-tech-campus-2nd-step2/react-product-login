import { rest } from 'msw';

import type { LoginData } from '@/types';

import { postLoginPath } from '../usePostLogin';
import { postMembershipPath } from '../usePostMembership';

type User = {
  email: string;
  password: string;
  token: string;
};

const getUsersFromSession = () => {
  const users = sessionStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUserToSession = (user: { email: string; password: string; token: string }) => {
  const users = getUsersFromSession();
  users.push(user);
  sessionStorage.setItem('users', JSON.stringify(users));
};

export const loginMockHandler = [
  rest.post<LoginData>(postMembershipPath(), async (req, res, ctx) => {
    const { email, password } = await req.json();
    const users = getUsersFromSession();
    console.log(users);

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid input' }));
    }

    const existingUser = users.find((user: User) => user.email === email);

    if (existingUser) {
      return res(ctx.status(400), ctx.json({ error: 'Email already exists' }));
    }

    const token = 'fake-jwt-token'; // 토큰 생성
    const newUser = { email, password, token };
    saveUserToSession(newUser);

    return res(
      ctx.status(201),
      ctx.json({
        email: newUser.email,
        token: newUser.token,
      }),
    );
  }),

  rest.post<LoginData>(postLoginPath(), async (req, res, ctx) => {
    const { email, password } = await req.json();
    const users = getUsersFromSession();
    console.log(users);

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid input' }));
    }

    const user = users.find((u: User) => u.email === email && u.password === password);
    if (!user) {
      return res(ctx.status(403), ctx.json({ error: 'Invalid email or password' }));
    }

    return res(ctx.status(200), ctx.json({ email: user.email, token: user.token }));
  }),
];
