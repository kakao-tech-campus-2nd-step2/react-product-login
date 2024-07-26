import { rest } from 'msw';

interface Register {
  email: string;
  password: string;
}

const register: Register[] = [];

export const authMockHandler = [
  rest.post('/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const existingUser = register.find((user) => user.email === email);

    if (existingUser) {
      return res(ctx.status(400), ctx.json({ error: '이미 존재하는 이메일입니다.' }));
    }

    const newUser: Register = { email, password };
    register.push(newUser);
    const token = 'token';

    return res(ctx.status(201), ctx.json({ email, token }));
  }),

  rest.post('/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const foundUser = register.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      return res(ctx.status(403), ctx.json({ error: '이메일 또는 비밀번호가 맞지 않습니다.' }));
    }

    const token = 'token';

    return res(ctx.status(200), ctx.json({ email, token }));
  }),
];
