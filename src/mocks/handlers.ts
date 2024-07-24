import { rest } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { PRODUCTS_MOCK_DATA } from '@/api/hooks/products.mock';

export const handlers = [
  rest.get('https://api.example.com/api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    const product = PRODUCTS_MOCK_DATA.content.find(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (product) => product.id.toString() === productId,
    );
    return res(ctx.json(product));
  }),
  ...categoriesMockHandler,
];
