import { rest } from 'msw';

import { getProductOptionsPath } from './useGetProductOptions';

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};

export type ProductOptionsResponseData = ProductOptionsData[];

export type ProductDetailRequestParams = { productId: string };

const mockProductOptions: ProductOptionsResponseData = [
  {
    id: 1,
    name: 'Small Red T-Shirt',
    quantity: 10,
    productId: 1001,
  },
  {
    id: 2,
    name: 'Medium Blue T-Shirt',
    quantity: 15,
    productId: 1001,
  },
  {
    id: 3,
    name: 'Large Green T-Shirt',
    quantity: 5,
    productId: 1001,
  },
];

export const productOptionsMockHandler = [
  rest.get(getProductOptionsPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params;

    console.log(`Mocked API call for product options. Product ID: ${productId}`);

    // Here you can add logic to return different options based on productId if needed
    // For now, we're returning the same options for any product ID
    return res(ctx.status(200), ctx.json(mockProductOptions));
  }),
];
