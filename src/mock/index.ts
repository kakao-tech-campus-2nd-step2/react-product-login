import { http, HttpResponse } from 'msw';
import RequestURLs from '@constants/RequestURLs';
import MockData from '@mock/MockData';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
];

export default handlers;
