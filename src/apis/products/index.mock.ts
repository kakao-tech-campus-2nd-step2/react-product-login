import { rest } from 'msw';
import { PRODUCTS_PATHS } from './path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const productsMockHandler = [
  rest.get(`${BASE_URL}${PRODUCTS_PATHS.PRODUCTS_DETAIL(':productId')}`, (req, res, ctx) => {
    const { productId } = req.params;
    if (productId === '3245119') {
      return res(ctx.json(PRODUCTS_MOCK_DATA));
    }
    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  }),
  rest.get(`${BASE_URL}${PRODUCTS_PATHS.PRODUCTS_OPTIONS(':productId')}`, (req, res, ctx) => {
    const { productId } = req.params;
    if (productId === '3245119') {
      return res(
        ctx.json({
          options: {
            giftOrderLimit: 100,
          },
        }),
      );
    }
    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  }),
];

const PRODUCTS_MOCK_DATA = {
  detail: {
    id: 3245119,
    name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
    imageURL: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
    price: {
      basicPrice: 145000,
    },
  },
};
