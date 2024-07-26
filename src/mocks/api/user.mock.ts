import { LiveStorage } from '@mswjs/storage';
import { rest } from 'msw';

import { VERCEL_API_URL } from '@/api/axiosInstance';
import { getRegisterPath } from '@/api/hooks/usePostRegister';
import type { PostLoginRequestBody, PostRegisterRequestBody } from '@/api/type';

type User = {
  id: number;
  email: string;
  password: string;
};

const USER_STORAGE = new LiveStorage<User[]>('userlist', [
  {
    id: 1,
    email: 'test',
    password: 'test',
  },
]);

const registerUser = (email: string, password: string) => {
  const USERLIST = USER_STORAGE.getValue();
  if (USERLIST.find((user) => user.email === email)) {
    throw new Error('Invalid input');
  } else {
    USER_STORAGE.update((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        email,
        password,
      },
    ]);

    const authToken = email;
    return authToken;
  }
};

const loginUser = (email: string, password: string) => {
  const USERLIST = USER_STORAGE.getValue();
  const user = USERLIST.find((u) => u.email === email && u.password === password);

  console.log(USERLIST);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const authToken = email;

  return authToken;
};

export const checkToken = (token: string): boolean => {
  const USERLIST = USER_STORAGE.getValue();
  return !!USERLIST.find((u) => u.email === token);
};

export const userMockHandler = [
  rest.post(VERCEL_API_URL + getRegisterPath(), (req, res, ctx) => {
    const { email, password } = req.body as PostRegisterRequestBody;

    try {
      const authToken = registerUser(email, password);
      return res(ctx.status(201), ctx.json({ email, token: authToken }));
    } catch (e) {
      if (e instanceof Error) {
        return res(ctx.status(400), ctx.json({ message: e.message }));
      } else {
        return res(ctx.status(500), ctx.json({ message: '알 수 없는 에러가 발생했습니다.' }));
      }
    }
  }),
  rest.post(VERCEL_API_URL + '/api/login', (req, res, ctx) => {
    const { email, password } = req.body as PostLoginRequestBody;

    try {
      const authToken = loginUser(email, password);
      return res(ctx.status(200), ctx.json({ email, token: authToken }));
    } catch (e) {
      if (e instanceof Error) {
        return res(ctx.status(403), ctx.json({ message: e.message }));
      } else {
        return res(ctx.status(500), ctx.json({ message: '알 수 없는 에러가 발생했습니다.' }));
      }
    }
  }),
];
