import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000/api';

// 모의 데이터
const generateRandomName = (): string => {
  const products = [
    'Product A',
    'Product B',
    'Product C',
    'Product D',
    'Product E',
    'Product F',
    'Product G',
    'Product H',
    'Product I',
    'Product J',
  ];
  return products[Math.floor(Math.random() * products.length)];
};

const generateRandomPrice = (): number => {
  return Math.floor(Math.random() * 10000) + 1;
};

const generateRandomImageUrl = (): string => {
  return 'https://www.jungle.co.kr/image/ea06cd0346fa8777cb624e3f'; // Placeholder image URL
};

let wishlist = Array.from({ length: 30 }, (_, id) => ({
  id: id + 1,
  product: {
    id: id + 1,
    name: generateRandomName(),
    price: generateRandomPrice(),
    imageUrl: generateRandomImageUrl(),
  },
}));
export const wishlistMockHandlers = [
  // 위시리스트 상품 추가
  rest.post(`${BASE_URL}/wishes`, (req, res, ctx) => {
    const { productId } = req.body as { productId: number };
    const newWish = {
      id: wishlist.length + 1,
      product: {
        id: productId,
        name: `Product ${productId}`,
        price: Math.floor(Math.random() * 1000),
        imageUrl: `http://example.com/product-${productId}.jpg`,
      },
    };
    wishlist.push(newWish);
    return res(ctx.status(201), ctx.json({ id: newWish.id, productId }));
  }),

  // 위시리스트 상품 삭제
  rest.delete(`${BASE_URL}/wishes/:wishId`, (req, res, ctx) => {
    const { wishId } = req.params;
    wishlist = wishlist.filter((wish) => wish.id !== Number(wishId));
    return res(ctx.status(204));
  }),

  // 위시리스트 상품 조회 (페이지네이션 적용)
  rest.get(`${BASE_URL}/wishes`, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page') || '0');
    const size = Number(req.url.searchParams.get('size') || '10');
    const sortParam = req.url.searchParams.get('sort') || 'createdDate,desc';

    const startIndex = page * size;
    const endIndex = startIndex + size;

    // 정렬 로직 구현 (여기서는 간단히 id로 정렬)
    const sortedWishlist = [...wishlist].sort((a, b) => {
      const [field, order] = sortParam.split(',');
      if (field === 'createdDate') {
        return order === 'desc' ? b.id - a.id : a.id - b.id;
      }
      return 0;
    });

    const paginatedWishes = sortedWishlist.slice(startIndex, endIndex);

    return res(
      ctx.status(200),
      ctx.json({
        content: paginatedWishes,
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: page,
          pageSize: size,
          offset: startIndex,
          unpaged: false,
          paged: true,
        },
        totalPages: Math.ceil(wishlist.length / size),
        totalElements: wishlist.length,
        last: endIndex >= wishlist.length,
        number: page,
        size: size,
        numberOfElements: paginatedWishes.length,
        first: page === 0,
        empty: paginatedWishes.length === 0,
      }),
    );
  }),
];
