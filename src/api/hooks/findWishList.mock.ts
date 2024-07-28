import { rest } from 'msw';
import { BASE_URL } from '../instance';
import { getMockData } from './mockData';

export const FindWishListMockHandler = [
  rest.get(`${BASE_URL}/api/wishes`, (_req, res, ctx) => {
    const data = getMockData();
    return res(ctx.status(200), ctx.json(data));
  }),
];
