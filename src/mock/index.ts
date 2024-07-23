import { http, HttpResponse } from 'msw';
import RequestURLs from '@constants/RequestURLs';
import MockData from '@mock/MockData';
import { setupWorker } from 'msw/browser';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const handlers = [
  http.get(BASE_URL + RequestURLs.CATEGORY, () => HttpResponse.json(MockData.MOCK_CATEGORIES)),
  http.get(
    BASE_URL + RequestURLs.CATEGORY_PRODUCTS,
    () => HttpResponse.json(MockData.MOCK_CATEGORY_ITEMS),
  ),
];

const worker = setupWorker(...handlers);

export default worker;
