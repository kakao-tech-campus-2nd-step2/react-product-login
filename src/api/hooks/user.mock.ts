import { rest } from 'msw';

interface User {
  email: string;
  password: string;
}

const users: User[] = [];
const tokens: { [key: string]: string } = {};

export const userMockHandlers = [
  // 회원가입 핸들러
  rest.post(`/api/members/register`, async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    // 이메일과 비밀번호가 'test'인지 확인
    if (email !== 'test' || password !== 'test') {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    // 새로운 사용자 추가
    users.push({ email, password });
    const token = `token-${Math.random().toString(36).substr(2)}`;
    tokens[email] = token;

    return res(ctx.status(201), ctx.json({ email, token }));
  }),

  // 로그인 핸들러
  rest.post(`/api/members/login`, async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    // 사용자 인증 확인
    const existingUser = users.find((user) => user.email === email && user.password === password);
    if (existingUser) {
      const token = tokens[email];
      return res(ctx.status(200), ctx.json({ email, token }));
    }
    return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
  }),
];
