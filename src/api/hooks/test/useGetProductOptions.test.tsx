import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../instance';
import { getProductOptions } from '../useGetProductOptions';

const server = setupServer();

describe('getProductOptions', () => {
  // 서버 설정
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('상품의 옵션 정보를 성공적으로 가져온다', async () => {
    const mockProductOptions = [
      { id: '1', name: '색상', values: ['빨강', '파랑', '녹색'] },
      { id: '2', name: '크기', values: ['소', '중', '대'] },
    ];

    server.use(
      rest.get(`${BASE_URL}/api/products/12345/options`, (_, res, ctx) => {
        return res(ctx.json(mockProductOptions));
      }),
    );

    const result = await getProductOptions({ productId: '12345' });

    expect(result).toEqual(mockProductOptions);
  });

  it('존재하지 않는 상품 ID로 요청 시 404 에러를 던진다', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/products/nonexistent/options`, (_, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    await expect(getProductOptions({ productId: 'nonexistent' })).rejects.toThrow();
  });

  it('서버 에러 발생 시 500 에러를 던진다', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/products/12345/options`, (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(getProductOptions({ productId: '12345' })).rejects.toThrow();
  });

  it('올바른 URL로 요청을 보낸다', async () => {
    let requestUrl = '';
    server.use(
      rest.get(`${BASE_URL}/api/products/:productId/options`, (req, res, ctx) => {
        requestUrl = req.url.toString();
        return res(ctx.json([]));
      }),
    );

    await getProductOptions({ productId: '12345' });

    expect(requestUrl).toBe(`${BASE_URL}/api/products/12345/options`);
  });

  it('빈 옵션 배열을 올바르게 처리한다', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/products/12345/options`, (_, res, ctx) => {
        return res(ctx.json([]));
      }),
    );

    const result = await getProductOptions({ productId: '12345' });

    expect(result).toEqual([]);
  });
});
