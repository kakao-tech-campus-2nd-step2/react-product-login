import { rest } from 'msw';

interface User {
  email: string;
  password: string;
}

const users: User[] = [];

export const userMockHandler = [
  rest.post('/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res(
        ctx.status(403),
        ctx.json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' }),
      );
    }
    const token = 'fake-token';
    return res(ctx.status(200), ctx.json({ email, token }));
  }),

  rest.post('/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const user = users.find((u) => u.email === email);

    if (user) {
      return res(ctx.status(400), ctx.json({ message: '이미 존재하는 이메일' }));
    }

    const newUser: User = { email, password };
    users.push(newUser);
    const token = 'fake-token';
    return res(ctx.status(201), ctx.json({ email, token }));
  }),
];
