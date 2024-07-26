// import { rest } from 'msw';

// import { BASE_URL } from './config';

// const wishlistData = [
//   {
//     id: 1,
//     product: {
//       id: 3245119,
//       name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
//       price: 145000,
//       imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
//     },
//   },
//   {
//     id: 2,
//     product: {
//       id: 2263833,
//       name: '외식 통합권 10만원권',
//       price: 100000,
//       imageUrl: 'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
//     },
//   },
// ];

// export const wishlistMockHandler = [
//   rest.get(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
//     return res(
//       ctx.json({
//         content: wishlistData,
//         pageable: {
//           sort: {
//             sorted: true,
//             unsorted: false,
//             empty: false,
//           },
//           pageNumber: 0,
//           pageSize: 10,
//           offset: 0,
//           unpaged: false,
//           paged: true,
//         },
//         totalPages: 1,
//         totalElements: wishlistData.length,
//         last: true,
//         number: 0,
//         size: 10,
//         numberOfElements: wishlistData.length,
//         first: true,
//         empty: false,
//       })
//     );
//   }),
//   rest.post(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
//     const { productId } = req.body;
//     const newWish = {
//       id: wishlistData.length + 1,
//       product: {
//         id: productId,
//         name: `Product ${productId}`,
//         price: 10000 * productId,
//         imageUrl: `http://example.com/product-${productId}.jpg`,
//       },
//     };
//     wishlistData.push(newWish);
//     return res(
//       ctx.status(201),
//       ctx.json(newWish)
//     );
//   }),
//   rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
//     const { wishId } = req.params;
//     const wishIndex = wishlistData.findIndex((wish) => wish.id === parseInt(wishId, 10));
//     if (wishIndex !== -1) {
//       wishlistData.splice(wishIndex, 1);
//       return res(ctx.status(204));
//     } else {
//       return res(ctx.status(404));
//     }
//   }),
// ];
