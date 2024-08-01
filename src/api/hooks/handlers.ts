import { rest } from 'msw';

const usersDB: { [key: string]: { password: string; token: string } } = {};

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    const { id, password } = req.body as { id: string; password: string };
    const user = usersDB[id];
    if (user && user.password === password) {
      return res(ctx.status(200), ctx.json({ success: true, token: user.token }));
    } else {
      return res(ctx.status(403), ctx.json({ success: false, message: 'Invalid credentials' }));
    }
  }),
  rest.post('/api/signup', (req, res, ctx) => {
    const { id, password } = req.body as { id: string; password: string };
    if (!id || !password) {
      return res(ctx.status(400), ctx.json({ success: false, message: 'Invalid signup data' }));
    }
    if (usersDB[id]) {
      return res(ctx.status(409), ctx.json({ success: false, message: 'User already exists' }));
    }
    const token = `fake-token-${id}`;
    usersDB[id] = { password, token };
    return res(ctx.status(200), ctx.json({ success: true, token }));
  }),
  // Add more handlers here if needed
];
