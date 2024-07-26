import { LiveStorage } from '@mswjs/storage';
import { rest } from 'msw';

import { VERCEL_API_URL } from '@/api/axiosInstance';
import { getPostWishesPath } from '@/api/hooks/usePostWishes';
import type { ProductData, WishesData } from '@/api/type';
import { getProductsById } from '@/mocks/api/products.mock';
import { checkToken } from '@/mocks/api/user.mock';

type Wishes = {
  [key: string]: WishesData[];
};

const WISHES_STORAGE = new LiveStorage<Wishes>('wishes', {});
const WISHES_LENGTH = new LiveStorage<number>('wishesLength', 0);

const addWishes = (userId: string, product: ProductData) => {
  const wish: WishesData = {
    id: WISHES_LENGTH.getValue() + 1,
    product,
  };

  WISHES_STORAGE.update((prev) => {
    const prevWishes = prev[userId] || [];
    return {
      ...prev,
      [userId]: [...prevWishes, wish],
    };
  });

  WISHES_LENGTH.update((prev) => prev + 1);
};

const deleteWishes = (userId: string, wishId: number) => {
  WISHES_STORAGE.update((prev) => {
    const prevWishes = prev[userId] || [];
    return {
      ...prev,
      [userId]: prevWishes.filter((wish) => wish.id !== wishId),
    };
  });
};

const getWishes = (userId: string) => {
  return WISHES_STORAGE.getValue()[userId] || [];
};

export const wishesMockHandler = [
  rest.post(VERCEL_API_URL + getPostWishesPath(), (req, res, ctx) => {
    const { Authorization: token } = req.headers as unknown as { Authorization: string };

    if (checkToken(token)) {
      const { productId } = req.body as { productId: number };

      const product = getProductsById(productId);

      if (!product) {
        return res(ctx.status(404), ctx.json({ message: 'Member or Product not found' }));
      }

      addWishes(token, product);
      return res(ctx.status(201));
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }
  }),
  rest.get(VERCEL_API_URL + '/api/wishes', (req, res, ctx) => {
    const { Authorization: token } = req.headers as unknown as { Authorization: string };

    if (checkToken(token)) {
      return res(ctx.json(getWishes(token)));
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }
  }),
  rest.delete(VERCEL_API_URL + '/api/wishes/:wishId', (req, res, ctx) => {
    const { Authorization: token } = req.headers as unknown as { Authorization: string };
    const { wishId } = req.params as { wishId: string };

    if (checkToken(token)) {
      deleteWishes(token, parseInt(wishId));
      return res(ctx.status(204));
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }
  }),
];
