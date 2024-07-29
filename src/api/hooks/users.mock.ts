import { rest } from 'msw';

import { getUserPath, getUsersPath } from './useGetUser';

export const usersMockHandler = [
  rest.post(getUsersPath(), async (req, res, ctx) => {
    try{
        const { id, password } = await req.json();
        if (!id || !password) {
            return await res(ctx.status(400));
        }
        usersMockData.push({ id, password });
        return await res(ctx.status(201));
    } catch (error) {
        return res(ctx.status(400));
    }
  }),
  rest.post(getUserPath(':id'), async (req, res, ctx) => {
    try {
    const { id } = req.params;
      const { password } = await req.json();
      if (!id || !password) {
        return await res(ctx.status(400));
      }

      const result = usersMockData.find((user) => user.id === id);

      if (result && result.password === password) {
        return await res(
          ctx.status(200)
        );
      } else {
        return await res(ctx.status(404));
      }
    } catch (error) {
      return res(ctx.status(400));
    }
  }),
];

const usersMockData = [{
  id: 'testUser',
  password: '0',
}];