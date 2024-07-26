import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000';

interface RegisterRequestBody {
    email: string;
    password: string;
}

interface RegisterSuccessResponse {
    email: string;
    token: string;
}

interface AddToWishlistRequestBody {
    productId: number;
}

interface AddToWishlistSuccessResponse {
    id: number;
    productId: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface Wish {
    id: number;
    product: Product;
}

interface PaginationResponse<T> {
    content: T[];
    pageable: {
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        pageNumber: number;
        pageSize: number;
        offset: number;
        unpaged: boolean;
        paged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export const handlers = [
    rest.post<RegisterRequestBody>(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
        }

        const response: RegisterSuccessResponse = {
            email,
            token: 'mocked-registration-token',
        };
        return res(ctx.status(201), ctx.json(response));
    }),

    rest.post<AddToWishlistRequestBody>(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
        const authorization = req.headers.get('authorization');
        const { productId } = req.body;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
        }

        if (!productId) {
            return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
        }

        const response: AddToWishlistSuccessResponse = {
            id: 1,
            productId,
        };
        return res(ctx.status(201), ctx.json(response));
    }),

    rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
        const authorization = req.headers.get('authorization');
        const { wishId } = req.params;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
        }

        if (!wishId) {
            return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
        }

        return res(ctx.status(204));
    }),

    rest.get(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
        const authorization = req.headers.get('authorization');
        const page = req.url.searchParams.get('page') || '0';
        const size = req.url.searchParams.get('size') || '10';
        const sort = req.url.searchParams.get('sort') || 'createdDate,desc';

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
        }

        const products: Product[] = [
            { id: 1, name: 'Product A', price: 100, imageUrl: 'http://example.com/product-a.jpg' },
            { id: 2, name: 'Product B', price: 150, imageUrl: 'http://example.com/product-b.jpg' },
        ];

        const wishes: Wish[] = products.map((product, index) => ({
            id: index + 1,
            product,
        }));

        const response: PaginationResponse<Wish> = {
            content: wishes,
            pageable: {
                sort: {
                    sorted: true,
                    unsorted: false,
                    empty: false,
                },
                pageNumber: Number(page),
                pageSize: Number(size),
                offset: Number(page) * Number(size),
                unpaged: false,
                paged: true,
            },
            totalPages: 5,
            totalElements: 50,
            last: Number(page) === 4,
            number: Number(page),
            size: Number(size),
            numberOfElements: wishes.length,
            first: Number(page) === 0,
            empty: wishes.length === 0,
        };

        return res(ctx.status(200), ctx.json(response));
    }),
];
