import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000';

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

const mockProductDetail: ProductDetail = {
  id: 1,
  name: 'Sample Product',
  price: 100,
  imageUrl:
    'https://i.namu.wiki/i/lTIwu3NCJk-m5VOdugukoiVGzyZAVauahUc2qnrOX-j8XFCA7PXv95cioeTRqrixnTUYDdfZnapP2Fo-jz3OBl5VYyd5SJpft-ZcMedgg4QmJGEkeol2W-do5U3mL6_vqQYTPAr7QBwp7VTts7kmfiYUgQ_Hosv7gwcBxnFagmo.webp',
  categoryId: 1,
};

export const productDetailMockHandler = [
  rest.get(`${BASE_URL}/api/products/:productId`, (req, res, ctx) => {
    const { productId } = req.params;

    // 실제 환경에서는 여기서 productId를 사용하여 다양한 상품을 반환할 수 있습니다.
    // 이 예제에서는 항상 같은 mockProductDetail을 반환합니다.
    if (productId) {
      return res(ctx.status(200), ctx.json(mockProductDetail));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
    }
  }),
];
