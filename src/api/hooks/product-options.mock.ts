import { rest } from 'msw';

import { getProductOptionsPath } from './useGetProductOptions';

export const productOptionsMockHandler = [
  rest.get(getProductOptionsPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params;
    const options = PRODUCT_OPTIONS_MOCK.filter((option) => option.productId === productId);

    return res(ctx.json(options));
  }),
];

export const PRODUCT_OPTIONS_MOCK = [
  { id: 1, name: 'Option A', quantity: 10, productId: '1' },
  { id: 2, name: 'Option B', quantity: 20, productId: '2' },
];
