import { rest } from 'msw';

import { getDeleteWishPath } from './useDeleteWish';
import { getWishesPath } from './useGetWish';
import { getPutWishPath } from './usePostWish';

export const wishesMockHandler = [
  rest.post(getPutWishPath(), async (req, res, ctx) => {
    let productId;
    await req.json().then((data) => {
      productId = data.productId;
    });
    return res(ctx.json([{ id: 0, productId: productId }]));
  }),

  rest.get(getWishesPath({}), (_, res, ctx) => {
    return res(ctx.json(WISHES_MOCK_DATA));
  }),

  rest.delete(getDeleteWishPath(':wishId'), (_, res, ctx) => {
    return res(ctx.status(204));
  }),
];

const WISHES_MOCK_DATA = {
  content: [
    {
      id: 1,
      product: {
        id: 3245119,
        name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
        price: 145000,
      },
    },
    {
      id: 2,
      product: {
        id: 6502823,
        name: '[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드',
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
        price: 108000,
      },
    },
    {
      id: 3,
      product: {
        id: 1181831,
        name: '[선물포장] 소바쥬 오 드 뚜왈렛 60ML',
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
        price: 122000,
      },
    },
    {
      id: 4,
      product: {
        id: 1379982,
        name: '[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)',
        imageUrl:
          'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
        price: 133000,
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
    pageSize: 2,
    offset: 0,
    unpaged: false,
    paged: true,
  },
  totalPages: 2,
  totalElements: 4,
  last: true,
  number: 0,
  size: 2,
  numberOfElements: 2,
  first: true,
  empty: false,
};
