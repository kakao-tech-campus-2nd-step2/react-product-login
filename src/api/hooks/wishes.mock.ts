import { rest } from 'msw';

export const wishesMockHandler = [
  rest.post('https://api.example.com/api/wishes', (req, res, ctx) => {
    const { productId } = req.body as { productId: number };

    return res(
      ctx.status(201),
      ctx.json({
        id: Math.floor(Math.random() * 1000),
        productId,
      }),
    );
  }),

  rest.delete('https://api.example.com/api/wishes/:wishId', (_, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.get('https://api.example.com/api/wishes', (_, res, ctx) => {
    return res(
      ctx.json({
        content: [
          {
            id: 1,
            product: {
              id: 1,
              name: 'Product A',
              price: 100,
              imageUrl:
                'https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png',
            },
          },
          {
            id: 2,
            product: {
              id: 2,
              name: 'Product B',
              price: 150,
              imageUrl:
                'https://st.kakaocdn.net/product/gift/product/20240709153502_a2722681b7e8490d9db2a696e079995c.png',
            },
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: 0,
          pageSize: 10,
          offset: 0,
          unpaged: false,
          paged: true,
        },
        totalPages: 5,
        totalElements: 50,
        last: false,
        number: 0,
        size: 10,
        numberOfElements: 2,
        first: true,
        empty: false,
      }),
    );
  }),
];
