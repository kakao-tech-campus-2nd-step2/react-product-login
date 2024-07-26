import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../instance';
import { getProductDetail } from '../useGetProductDetail';

const server = setupServer();

describe('getProductDetail', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('상품의 상세 정보를 성공적으로 가져온다', async () => {
    const mockProductData = {
      id: '12345',
      name: '테스트 상품',
      price: 10000,
      description: '이것은 테스트 상품입니다.',
    };

    server.use(
      rest.get(`${BASE_URL}/api/products/12345`, (_, res, ctx) => {
        return res(ctx.json(mockProductData));
      }),
    );

    const result = await getProductDetail({ productId: '12345' });

    expect(result).toEqual(mockProductData);
  });

  it('존재하지 않는 상품 ID로 요청 시 404 에러를 던진다', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/products/nonexistent`, (_, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    await expect(getProductDetail({ productId: 'nonexistent' })).rejects.toThrow();
  });

  it('서버 에러 발생 시 500 에러를 던진다', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/products/12345`, (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(getProductDetail({ productId: '12345' })).rejects.toThrow();
  });

  it('올바른 URL로 요청을 보낸다', async () => {
    let requestUrl = '';
    server.use(
      rest.get(`${BASE_URL}/api/products/:productId`, (req, res, ctx) => {
        requestUrl = req.url.toString();
        return res(ctx.json({}));
      }),
    );

    await getProductDetail({ productId: '12345' });

    expect(requestUrl).toBe(`${BASE_URL}/api/products/12345`);
  });
});
