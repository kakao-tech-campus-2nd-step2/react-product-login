import { http, HttpResponse } from 'msw';
import RequestURLs from '@constants/RequestURLs';
import MockData from '@mock/MockData';
import { setupWorker } from 'msw/browser';

const handlers = [
  http.get(RequestURLs.CATEGORY, () => HttpResponse.json(MockData.MOCK_CATEGORIES)),
  http.get(RequestURLs.CATEGORY_PRODUCTS, () => HttpResponse.json(MockData.MOCK_CATEGORY_ITEMS)),
];

const worker = setupWorker(...handlers);

export default worker;
