import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../../api/instance';
import { getCategories } from '../useGetCategorys';

describe('useGetCategorys.ts', () => {
  const server = setupServer(
    rest.get(`${BASE_URL}/api/categories`, (_, res, ctx) => {
      return res(
        ctx.json([
          { id: 1, name: '카테고리 1' },
          { id: 2, name: '카테고리 2' },
        ]),
      );
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('[api] getCategories', () => {
    it('카테고리를 올바르게 가져온다', async () => {
      const categories = await getCategories();
      expect(categories).toEqual([
        { id: 1, name: '카테고리 1' },
        { id: 2, name: '카테고리 2' },
      ]);
    });
  });
});
