export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  products: '/products/:productsId',
  order: '/order',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  products: (productsId: string) => RouterPath.products.replace(':productsId', productsId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
