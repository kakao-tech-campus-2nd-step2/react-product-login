export const RouterPath = {
  root: '/',
  home: '/',
  category: '/category/:categoryId',
  myAccount: '/my-account',
  productsDetail: '/products/:productId',
  order: '/order',
  login: '/login',
  register: '/register',
  notFound: '*',
};

export const getDynamicPath = {
  category: (categoryId: string) => RouterPath.category.replace(':categoryId', categoryId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  // TODO: register api가 생성되면 경로 수정
  register: () => {
    return `${RouterPath.register}`;
  },
  productsDetail: (goodsId: number | string) =>
    RouterPath.productsDetail.replace(
      ':productId',
      typeof goodsId === 'number' ? goodsId.toString() : goodsId,
    ),
};
