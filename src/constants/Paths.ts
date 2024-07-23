const Paths = {
  MAIN_PAGE: '/',
  THEME_PAGE: (themeKey: string) => `/theme/${themeKey}`,
  LOGIN_PAGE: '/login',
  MYACCOUNT_PAGE: '/my-account',
  PRODUCT_DETAILS: (productId: string) => `/products/${productId}`,
  PRODUCT_ORDER: '/order',
};

export default Paths;
