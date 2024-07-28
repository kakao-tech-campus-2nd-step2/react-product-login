import { rest } from 'msw';

interface User {
  email: string;
  password: string;
  mockToken: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const userMockList: User[] = [
  {
    email: 'test',
    password: 'test',
    mockToken: 'mock-token',
  },
];

export const loginHandlers = [
  rest.post('/api/members/login', async (req, res, ctx) => {
    const { email, password }: LoginRequestBody = await req.json();

    const foundUser = userMockList.find((user) => user.email === email);

    if (foundUser && foundUser.password === password) {
      return res(
        ctx.status(200),
        ctx.json({
          email: foundUser.email,
          token: foundUser.mockToken,
        }),
      );
    }

    return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
  }),
];
