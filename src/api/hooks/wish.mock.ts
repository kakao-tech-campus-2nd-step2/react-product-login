import { rest } from "msw";

import { BASE_URL } from "../instance";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Wish {
  id: number;
  product: Product;
}

let wishes: Wish[] = [
  {
    id: 1,
    product: {
      id: 11,
      name: "Product A",
      price: 1000,
      imageUrl:
        "https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png",
    },
  },
  {
    id: 2,
    product: {
      id: 12,
      name: "Product B",
      price: 2000,
      imageUrl:
        "https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png",
    },
  },
];

export const wishlistMockHandler = [
  rest.post(`${BASE_URL}/api/wishes`, async (_, res, ctx) => {
    const result = { id: 3, productId: "Product C" };
    return res(ctx.status(201), ctx.json(result));
  }),

  rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
    const { wishId } = req.params;
    const wishIndex = wishes.findIndex((wish) => wish.id === parseInt(wishId as string));

    if (wishIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: "Wish not found" }));
    }

    wishes = wishes.filter((wish) => wish.id !== parseInt(wishId as string));
    console.log(wishes);
    return res(ctx.status(204));
  }),

  rest.get(`${BASE_URL}/api/wishes`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ content: wishes }));
  }),
];
