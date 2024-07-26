import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000';

interface ProductOption {
  id: number;
  name: string;
  quantity: number;
  productId: number;
}

// 동적으로 옵션을 생성하는 함수
const generateOptions = (productId: number): ProductOption[] => {
  const optionCount = Math.floor(Math.random() * 3) + 1; // 1에서 3개의 옵션 생성
  return Array.from({ length: optionCount }, (_, index) => ({
    id: index + 1,
    name: `Option ${String.fromCharCode(65 + index)}`, // A, B, C...
    quantity: Math.floor(Math.random() * 50) + 10, // 10에서 59 사이의 수량
    productId: productId,
  }));
};

export const productOptionsMockHandler = [
  rest.get(`${BASE_URL}/api/products/:productId/options`, (req, res, ctx) => {
    const { productId } = req.params;
    const options = generateOptions(Number(productId));

    return res(ctx.status(200), ctx.json(options));
  }),
];
