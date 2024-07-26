import { rest } from 'msw';

type AuthRequestBody = {
  email: string;
  password: string;
};

export const handlers = [
  rest.get('/api/detail', (_req, res, ctx) => {
    return res(ctx.json({ id: 1, name: 'Product Name', description: 'Product Description' }));
  }),
  rest.get('/api/option', (_req, res, ctx) => {
    return res(ctx.json({ options: ['Option 1', 'Option 2'] }));
  }),
  rest.post('/api/members/register', (req, res, ctx) => {
    const { email, password } = req.body as AuthRequestBody;
    console.log(email, password);

    return res(
      ctx.status(201),
      ctx.json({
        email,
        token: 'mock-token',
      })
    );
  }),
  rest.post('/api/members/login', (req, res, ctx) => {
    const { email, password } = req.body as AuthRequestBody;
    console.log(email, password);

    if (email === 'test@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: 'mock-token',
        })
      );
    }

    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Invalid email or password',
      })
    );
  }),
  rest.get('/login', (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('/favicon.ico', (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
