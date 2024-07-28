import { LiveStorage } from '@mswjs/storage';
import { rest } from 'msw';

import { VERCEL_API_URL } from '@/api/axiosInstance';
import { getDeleteWishesPath } from '@/api/hooks/useDeleteWishes';
import { getWishesPath } from '@/api/hooks/useGetWishes';
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

  if (!WISHES_STORAGE.getValue()[userId]) {
    WISHES_STORAGE.update((prev) => {
      return {
        ...prev,
        [userId]: [],
      };
    });
  }

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
  console.log(WISHES_STORAGE.getValue()[userId]);
  return WISHES_STORAGE.getValue()[userId] || [];
};

export const wishesMockHandler = [
  rest.post(VERCEL_API_URL + getPostWishesPath(), (req, res, ctx) => {
    const token = req.headers.get('authorization') || '';

    if (checkToken(token)) {
      const { productId } = req.body as { productId: number };

      const product = getProductsById(productId);

      if (!product) {
        return res(ctx.status(404), ctx.json({ message: 'Member or Product not found' }));
      }

      if (WISHES_STORAGE.getValue()[token]?.find((w) => w.product.id === product.id)) {
        return res(ctx.status(409), ctx.json({ message: 'Already added to wish list' }));
      }

      addWishes(token, product);
      return res(ctx.status(201));
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }
  }),
  rest.get(VERCEL_API_URL + getWishesPath({}), (req, res, ctx) => {
    const token = req.headers.get('authorization') || '';

    if (checkToken(token)) {
      return res(
        ctx.json({
          content: getWishes(token),
          last: true,
          totalElements: WISHES_LENGTH.getValue(),
          totalPages: 1,
          size: 10,
          number: 0,
          first: true,
          numberOfElements: 1,
          empty: false,
        }),
      );
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }
  }),
  rest.delete(VERCEL_API_URL + getDeleteWishesPath(), (req, res, ctx) => {
    const token = req.headers.get('authorization') || '';
    const { wishId } = req.params as { wishId: string };

    if (checkToken(token)) {
      deleteWishes(token, parseInt(wishId));
      return res(ctx.status(204));
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }
  }),
];
