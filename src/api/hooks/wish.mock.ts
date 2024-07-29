import { rest } from 'msw';

let wishlist: { id: number; productId: number; name: string }[] = [];

export const wishMockHandlers = [
  // 관심 목록 조회 핸들러
  rest.get('/api/wishes', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }

    // 응답 데이터 형식에 맞게 가공
    return res(ctx.status(200), ctx.json({ content: wishlist }));
  }),

  // 관심 상품 추가 핸들러
  rest.post('/api/wishes', async (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const { productId } = await req.json();

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }

    // 새로운 상품 추가 로직
    // TODO : 상품 이미지, 이름 올바르게 가져오도록 하기
    const newWish = {
      id: wishlist.length + 1,
      productId,
      name: `상품${wishlist.length + 1}`,
    };

    wishlist.push(newWish);

    return res(ctx.status(201), ctx.json(newWish));
  }),

  // 관심 상품 삭제 핸들러
  rest.delete('/api/wishes/:wishId', (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    const wishId = Array.isArray(req.params.wishId) ? req.params.wishId[0] : req.params.wishId;

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }

    wishlist = wishlist.filter((wish) => wish.id !== parseInt(wishId, 10));

    return res(ctx.status(204)); // No content
  }),
];
