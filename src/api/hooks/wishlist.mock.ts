// src/mocks/wishlist.mock.ts
import { rest } from 'msw';

interface AddToWishlistRequestBody {
  productId: number;
}

const WISHLIST_MOCK_DATA = [
  {
    id: 1,
    productId: 3245119,
  },
  {
    id: 2,
    productId: 2263833,
  },
];

export const wishlistMockHandler = [
  rest.post('/api/wishes', (req, res, ctx) => {
    const { productId } = req.body as AddToWishlistRequestBody;
    // Mocked ID generation
    const newId = WISHLIST_MOCK_DATA.length + 1;
    const newWishlistItem = { id: newId, productId };

    WISHLIST_MOCK_DATA.push(newWishlistItem);

    return res(ctx.status(201), ctx.json(newWishlistItem));
  }),
];
