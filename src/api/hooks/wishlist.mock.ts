import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000/api';

// 모의 데이터
let wishlist = [
  {
    id: 1,
    product: {
      id: 1,
      name: "Product A",
      price: 100,
      imageUrl: "http://example.com/product-a.jpg"
    }
  },
  {
    id: 2,
    product: {
      id: 2,
      name: "Product B",
      price: 150,
      imageUrl: "http://example.com/product-b.jpg"
    }
  }
];

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
        imageUrl: `http://example.com/product-${productId}.jpg`
      }
    };
    wishlist.push(newWish);
    return res(
      ctx.status(201),
      ctx.json({ id: newWish.id, productId })
    );
  }),

  // 위시리스트 상품 삭제
  rest.delete(`${BASE_URL}/wishes/:wishId`, (req, res, ctx) => {
    const { wishId } = req.params;
    wishlist = wishlist.filter(wish => wish.id !== Number(wishId));
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
            empty: false
          },
          pageNumber: page,
          pageSize: size,
          offset: startIndex,
          unpaged: false,
          paged: true
        },
        totalPages: Math.ceil(wishlist.length / size),
        totalElements: wishlist.length,
        last: endIndex >= wishlist.length,
        number: page,
        size: size,
        numberOfElements: paginatedWishes.length,
        first: page === 0,
        empty: paginatedWishes.length === 0
      })
    );
  })
];