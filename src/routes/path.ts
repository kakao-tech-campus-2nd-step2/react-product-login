export const ROUTER_PATH = {
  HOME: '/',
  CATEGORY: '/category/:categoryId',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  MY_ACCOUNT: '/my-account',
  PRODUCTSDETAIL: '/products/:productId',
  ORDER: '/order',
  NOT_FOUND: '*',
};

export const getDynamicPath = {
  category: (categoryId: string) =>
    ROUTER_PATH.CATEGORY.replace(':categoryId', categoryId),
  productsDetail: (productId: number) =>
    ROUTER_PATH.PRODUCTSDETAIL.replace(':productId', productId.toString()),
};
