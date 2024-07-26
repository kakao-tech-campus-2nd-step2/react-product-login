import { rest } from 'msw';
import { postAddWishListPath, WishRequestData, WishResponseData } from '@/api/hooks/useAddWishList';

export const AddWishListMockHandler = [
  rest.post(postAddWishListPath(), (req, res, ctx) => {
    const { productId } = req.body as WishRequestData;

    if (!productId) {
      // productId가 없는 경우 400 에러 반환
      return res(
        ctx.status(400),
        ctx.json({
          error: 'Bad Request',
          message: 'Product ID is required',
        }),
      );
    }

    // 가짜 응답 데이터
    const mockResponse: WishResponseData = {
      id: 1,
      productId,
    };

    return res(ctx.status(200), ctx.json(mockResponse));
  }),
];
