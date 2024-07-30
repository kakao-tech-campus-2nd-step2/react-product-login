import { rest } from 'msw';

import { PRODUCTS_MOCK_DATA } from './products.mock';
import { deleteWishlistPath, getWishlistPath, postWishlistPath, type WishResponseData } from './useGetWishlist';

// TODO: 서버 로그인 방식 확인 후 request body에 userId 삭제 필요

export const wishlistMockHandler = [
    rest.post(postWishlistPath(), async (req, res, ctx) => {
        const { productId, userId } = await req.json();
        if(!productId || !userId) {
            return res(ctx.status(400));
        }
        const product: WishResponseData["product"] | undefined= PRODUCTS_MOCK_DATA.content.find((_product) => _product.id === productId);
        if (!product) {
            return res(ctx.status(400));
        }
        wishlistMockData.push({
            id: wishlistMockData.length + 1,
            product,
            createdDate: new Date(Date.now()), 
            userId
        });

        return res(ctx.status(201));
    }),
    rest.delete(deleteWishlistPath(':wishId'), (req, res, ctx) => {
        const { wishId } = req.params;

        const index = wishlistMockData.findIndex((wish) => wish.id === Number(wishId));
        if (index === -1) {
            return res(ctx.status(404));
        }

        wishlistMockData.splice(index, 1);
        return res(ctx.status(204));
    }),
    rest.get(getWishlistPath({}), (req, res, ctx) => {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const page = url.searchParams.get('page');
        const size = url.searchParams.get('size');
        const sort = url.searchParams.get('sort');

        const result = wishlistMockData.filter((wish) => wish.userId === userId)
        if(page && size)
            result.slice(Number(page) * Number(size), Number(page) * Number(size) + Number(size));
        if(sort){
            // TODO: sort 키워드 확인 후 정렬 로직 추가
            const [ key, order ] = sort.split(',');
            if(key === 'createdDate')
                result.sort((a, b) => {
                    if(order === 'asc')
                        return a.createdDate.getTime() - b.createdDate.getTime();
                    else
                        return b.createdDate.getTime() - a.createdDate.getTime();
                });
        }

        return res(ctx.json(result));
    }),
];


const wishlistMockData: WishResponseData[] = [{
    id: 1,
    product: PRODUCTS_MOCK_DATA.content[0],
    createdDate: new Date('2021-09-01'), 
    userId: 'testUser',
}]