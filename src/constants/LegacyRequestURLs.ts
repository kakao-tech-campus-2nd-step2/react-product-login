const BASE_API_PATH = '/api/v1';

const endpoints = {
  RANKING_PRODUCTS: '/ranking/products',
  THEMES: '/themes',
  THEME_PRODUCTS: '/themes/:themeKey/products',
  PRODUCT_DETAILS: '/products/:productId/detail',
  PRODUCT_OPTIONS: '/products/:productId/options',
  MESSAGE_CARD_TEMPLATE: '/message-card/templates',
  MY_ACCOUNT_INFO: '/my-account/info',
  MY_WISH_PRODUCTS: '/my-account/wish/products',
  MY_ACCOUNT_POINT: '/my-account/point',
  ORDER: '/order',
};

type RequestURLKey = keyof typeof endpoints;
type RequestURLType = { [key in RequestURLKey]: string };

const LegacyRequestURLs: RequestURLType = {} as RequestURLType;

Object.entries(endpoints).forEach(([key, value]) => {
  LegacyRequestURLs[key as RequestURLKey] = BASE_API_PATH + value;
});

export default LegacyRequestURLs;
