import { rest } from 'msw';

const tempWishlist = [];

export const mockApiHandlers = [
  // TODO: api/members/register로 하면 http를 사용해서 matching request url이 없다고 나옴
  rest.post('https://api.example.com/api/members/register', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    return res(
      ctx.status(201),
      ctx.json({
        email,
        token: 'mock-token',
      }),
    );
  }),
  rest.post('https://api.example.com/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    // temporary mock user
    if (email === 'qqqq' && password === 'wwww') {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: 'mock-token',
        }),
      );
    }

    return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
  }),
  rest.post('https://api.example.com/api/wishes', async (req, res, ctx) => {
    const { productId } = await req.json<{ productId: number }>();
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    if (!productId) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    tempWishlist.push(productId);

    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        productId,
      }),
    );
  }),
];
