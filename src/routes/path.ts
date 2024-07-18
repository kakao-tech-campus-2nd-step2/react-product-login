export const ROUTER_PATH = {
  HOME: '/',
  THEME: '/theme/:themeKey',
  LOGIN: '/login',
  MY_ACCOUNT: '/my-account',
  PRODUCTS: '/products/:productId',
  ORDER: '/order',
};

export const getDynamicPath = {
  theme: (themeKey: string) => ROUTER_PATH.THEME.replace(':themeKey', themeKey),
  products: (productId: number) =>
    ROUTER_PATH.PRODUCTS.replace(':productId', productId.toString()),
};
