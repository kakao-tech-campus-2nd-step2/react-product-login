const BASE_API_PATH = '/api';

const endpoints = {
  CATEGORY: '/category',
  CATEGORY_PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:productId',
  PRODUCT_OPTIONS: '/products/:productId/options',
  MESSAGE_CARD_TEMPLATE: '/message-card/templates',
  MY_ACCOUNT_INFO: '/my-account/info',
  ORDER: '/order',
  LOGIN: '/members/login',
  REGISTER: '/members/register',
  WISHES: '/wishes',
  DELETE_WISHES: '/wishes/:wishId',
};

type RequestURLKey = keyof typeof endpoints;
type RequestURLType = { [key in RequestURLKey]: string };

const RequestURLs: RequestURLType = {} as RequestURLType;

Object.entries(endpoints).forEach(([key, value]) => {
  RequestURLs[key as RequestURLKey] = BASE_API_PATH + value;
});

export default RequestURLs;

export const AuthenticatedRequestURLs = {
  [RequestURLs.WISHES]: true,
  [RequestURLs.DELETE_WISHES]: true,
};
