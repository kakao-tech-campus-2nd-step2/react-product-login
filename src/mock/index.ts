import { http, HttpResponse } from 'msw';
import RequestURLs from '@constants/RequestURLs';
import MockData from '@mock/MockData';
import { StatusCodes } from 'http-status-codes';
import { LoginRequestBody } from '@/types/request';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function isLoginInfoCorrect(body: LoginRequestBody) {
  const loginData = MockData.MOCK_LOGIN_INFO;

  return body.email === loginData.email && body.password === loginData.password;
}

const handlers = [
  http.get(BASE_URL + RequestURLs.CATEGORY, () => HttpResponse.json(MockData.MOCK_CATEGORIES)),
  http.get(
    BASE_URL + RequestURLs.CATEGORY_PRODUCTS,
    () => HttpResponse.json(MockData.MOCK_CATEGORY_ITEMS),
  ),
  http.get(
    BASE_URL + RequestURLs.PRODUCT_DETAILS,
    () => HttpResponse.json(MockData.MOCK_PRODUCT_DETAIL),
  ),
  http.post(
    BASE_URL + RequestURLs.REGISTER,
    async (info) => {
      const body = await info.request.json() as LoginRequestBody;

      if (!isLoginInfoCorrect(body)) {
        return new HttpResponse('Invalid Input', {
          status: StatusCodes.BAD_REQUEST,
        });
      }

      return HttpResponse.json(MockData.MOCK_LOGIN_DATA);
    },
  ),
  http.post(
    BASE_URL + RequestURLs.LOGIN,
    async (info) => {
      const body = await info.request.json() as LoginRequestBody;

      if (!isLoginInfoCorrect(body)) {
        return new HttpResponse('Invalid email or password', {
          status: StatusCodes.FORBIDDEN,
        });
      }

      return HttpResponse.json(MockData.MOCK_LOGIN_DATA);
    },
  ),
  http.get(
    BASE_URL + RequestURLs.WISHES,
    async () => (
      HttpResponse.json(MockData.MOCK_WISHES)
    ),
  ),
  http.post(
    BASE_URL + RequestURLs.WISHES,
    async (info) => {
      const result = {
        wishId: 1,
        productId: 1,
      };

      if (!info.request.headers.has('Authorization')) {
        return new HttpResponse('Invalid or missing token');
      }

      return HttpResponse.json(result);
    },
  ),
  http.delete(
    BASE_URL + RequestURLs.DELETE_WISHES,
    async (info) => {
      if (!info.request.headers.has('Authorization')) {
        return new HttpResponse('Invalid or missing token');
      }

      return new HttpResponse('', {
        status: StatusCodes.NO_CONTENT,
      });
    },
  ),
];

export default handlers;
