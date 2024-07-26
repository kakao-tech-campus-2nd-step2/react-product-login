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

export const createAccountMockHandler = [
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
];