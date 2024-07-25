const Paths = {
  MAIN_PAGE: '/',
  CATEGORY_PAGE: (categoryId: number | string) => `/category/${categoryId}`,
  LOGIN_PAGE: '/login',
  MYACCOUNT_PAGE: '/my-account',
  PRODUCT_DETAILS: (productId: string) => `/products/${productId}`,
  PRODUCT_ORDER: '/order',
  REGISTER_PAGE: '/register',
};

export default Paths;
