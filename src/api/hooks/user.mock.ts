import { rest } from 'msw';

interface User {
  email: string;
  password: string;
}

const users: User[] = [];

const registerUser = (email: string): string => {
  return `token_${email}`;
};

const loginUser = (email: string): string => {
  return `token_${email}`;
};

export const userMockHandler = [
  rest.post('/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return res(ctx.status(403), ctx.json({ message: '알 수 없는 에러가 발생했습니다.' }));
    }

    const authToken = registerUser(email);
    return res(ctx.status(200), ctx.json({ email, token: authToken }));
  }),

  rest.post('/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      return res(ctx.status(400), ctx.json({ message: '알 수 없는 에러가 발생했습니다.' }));
    }

    const newUser: User = { email, password };
    users.push(newUser);

    const authToken = loginUser(email);
    return res(ctx.status(201), ctx.json({ email, token: authToken }));
  }),
];
