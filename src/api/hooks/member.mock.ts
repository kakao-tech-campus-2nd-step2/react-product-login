import { rest } from 'msw';

interface User {
  email: string;
  password: string;
}

const users: User[] = [];

export const authMockHandler = [
  rest.post('/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res(ctx.status(400), ctx.json({ error: '이미 존재하는 이메일입니다.' }));
    }

    const newUser: User = { email, password };
    users.push(newUser);
    const token = 'mocked-token';

    return res(ctx.status(201), ctx.json({ email, token }));
  }),

  rest.post('/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      return res(ctx.status(403), ctx.json({ error: '이메일 또는 비밀번호가 잘못되었습니다.' }));
    }

    const token = 'mocked-token';

    return res(ctx.status(200), ctx.json({ email, token }));
  }),
];
