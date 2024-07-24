export const RouterPath = {
  root: '/',
  home: '/',
  category: '/category/:categoryId',
  products: '/products/:productsId',
  order: '/order',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  category: (categoryId: string) => RouterPath.category.replace(':categoryId', categoryId),
  products: (productsId: string) => RouterPath.products.replace(':productsId', productsId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
