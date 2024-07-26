import { rest } from 'msw';

import { VERCEL_API_URL } from '@/api/axiosInstance';
import { getRegisterPath } from '@/api/hooks/usePostRegister';
import type { PostLoginRequestBody, PostRegisterRequestBody } from '@/api/type';

type User = {
  id: number;
  loginId: string;
  password: string;
};

const USERLIST: User[] = [
  {
    id: 1,
    loginId: 'test',
    password: 'test',
  },
];

const registerUser = (loginId: string, password: string) => {
  if (USERLIST.find((user) => user.loginId === loginId)) {
    throw new Error('이미 존재하는 아이디입니다.');
  } else {
    USERLIST.push({
      id: USERLIST.length + 1,
      loginId,
      password,
    });

    const authToken = loginId;
    return authToken;
  }
};

const loginUser = (loginId: string, password: string) => {
  const user = USERLIST.find((u) => u.loginId === loginId && u.password === password);

  if (!user) {
    throw new Error('아이디 또는 비밀번호가 틀렸습니다.');
  }

  const authToken = loginId;

  return authToken;
};

export const userMockHandler = [
  rest.post(VERCEL_API_URL + getRegisterPath(), (req, res, ctx) => {
    const { loginId, password } = req.body as PostRegisterRequestBody;

    try {
      const authToken = registerUser(loginId, password);
      return res(ctx.status(201), ctx.json({ authToken }));
    } catch (e) {
      if (e instanceof Error) {
        return res(ctx.status(400), ctx.json({ message: e.message }));
      } else {
        return res(ctx.status(500), ctx.json({ message: '알 수 없는 에러가 발생했습니다.' }));
      }
    }
  }),
  rest.post(VERCEL_API_URL + '/api/login', (req, res, ctx) => {
    const { loginId, password } = req.body as PostLoginRequestBody;

    try {
      const authToken = loginUser(loginId, password);
      return res(ctx.status(200), ctx.json({ authToken }));
    } catch (e) {
      if (e instanceof Error) {
        return res(ctx.status(400), ctx.json({ message: e.message }));
      } else {
        return res(ctx.status(500), ctx.json({ message: '알 수 없는 에러가 발생했습니다.' }));
      }
    }
  }),
];
