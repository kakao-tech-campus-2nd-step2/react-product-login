import { rest } from 'msw';

interface User {
  email: string;
  password: string;
  mockToken: string;
}

const userMockList: User[] = [
  {
    email: 'test',
    password: 'test',
    mockToken: 'mock-token',
  },
];

export const memberMockHandler = [
  rest.post('/api/members/register', async (req, res, ctx) => {
    try {
      const { email, password } = await req.json();
      if (!email || !password) {
        return await res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
      }

      const foundUser = userMockList.find((user) => user.email === email);

      if (foundUser && foundUser.password === password) {
        return await res(
          ctx.status(201),
          ctx.json({
            email,
            token: foundUser.mockToken,
          }),
        );
      } else {
        return await res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
      }
    } catch (error) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }
  }),
];
