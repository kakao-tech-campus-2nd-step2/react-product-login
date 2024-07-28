import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000';

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

export const PRODUCTS_MOCK_DATA = {
  content: [
    {
      id: 3245119,
      name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      price: 145000,
      categoryId: 2920,
    },
    {
      id: 2263833,
      name: '외식 통합권 10만원권',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
      price: 100000,
      categoryId: 2930,
    },
    {
      id: 6502823,
      name: '[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
      price: 108000,
      categoryId: 2930,
    },
    {
      id: 1181831,
      name: '[선물포장] 소바쥬 오 드 뚜왈렛 60ML',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
      price: 122000,
      categoryId: 2920,
    },
    {
      id: 1379982,
      name: '[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
      price: 133000,
      categoryId: 2920,
    },
  ],
  number: 0,
  totalElements: 5,
  size: 10,
  last: true,
};

// 카테고리별 제품 목록 API 경로
export const getProductsPath = ({ categoryId, pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `${BASE_URL}/api/products?${params.toString()}`;
};

// MSW 핸들러 정의
export const productsMockHandler = [
  rest.get(getProductsPath({ categoryId: '2920' }), (_, res, ctx) => {
    return res(ctx.json(PRODUCTS_MOCK_DATA));
  }),
  rest.get(getProductsPath({ categoryId: '2930' }), (_, res, ctx) => {
    return res(ctx.json(PRODUCTS_MOCK_DATA));
  }),
];
