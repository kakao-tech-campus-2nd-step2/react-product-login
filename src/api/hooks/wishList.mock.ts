import { rest } from 'msw';

type WishRequest = {
  productId: number;
};

export const wishListMockHandler = [
  rest.post('/api/wishes', (req, res, ctx) => {
    const { productId } = req.body as WishRequest;

    if (!productId) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    const newWish = {
      id: wishList.length + 1,
      product: {
        id: productId,
        name: `Product ${productId}`,
        price: 100,
        imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png',
      },
    };

    wishList.push(newWish);

    return res(ctx.status(201), ctx.json(newWish));
  }),

  rest.delete('/api/wishes/:wishId', (req, res, ctx) => {
    const { wishId } = req.params;

    const wishIndex = wishList.findIndex((wish) => wish.id === parseInt(wishId as string));

    if (wishIndex === -1) {
      return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
    }

    wishList.splice(wishIndex, 1);

    return res(ctx.status(204));
  }),

  rest.get('/api/wishes', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(wishList));
  }),
];

const wishList = [
  {
    id: 1,
    product: {
      id: 1,
      name: 'Product A',
      price: 100,
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png',
    },
  },
  {
    id: 2,
    product: {
      id: 2,
      name: 'Product B',
      price: 150,
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png',
    },
  },
];
