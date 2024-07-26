export const RouterPath = {
  root: '/',
  home: '/',
  category: '/category/:categoryId',
  myAccount: '/my-account',
  productsDetail: '/products/:productId',
  order: '/order',
  login: '/login',
  notFound: '*',
};

export const ApiPath = {
  members: {
    register: '/api/members/register',
    login: '/api/members/login',
  },
  wishes: {
    root: '/api/wishes',
    detail: (wishId: number | string) => `/api/wishes/${wishId}`,
  },
  products: {
    root: '/api/products',
    detail: (productId: string) => `/api/products/${productId}`,
    options: (productId: string) => `/api/products/${productId}/options`,
  },
};

export const getDynamicPath = {
  category: (categoryId: string) => RouterPath.category.replace(':categoryId', categoryId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  productsDetail: (productId: number | string) =>
    RouterPath.productsDetail.replace(
      ':productId',
      typeof productId === 'number' ? productId.toString() : productId,
    ),
};
