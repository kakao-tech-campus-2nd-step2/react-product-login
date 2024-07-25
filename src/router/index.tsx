import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@pages/MainPage';
import Paths from '@constants/Paths';
import CategoryPage from '@pages/CategoryPage';
import LoginPage from '@pages/LoginPage';
import MyPage from '@pages/MyPage';
import ProductDetailsPage from '@pages/ProductDetailsPage';
import ProductOrderPage from '@pages/ProductOrderPage';
import RegisterPage from '@pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: Paths.MAIN_PAGE,
    element: <MainPage />,
  },
  {
    path: Paths.CATEGORY_PAGE(':categoryId'),
    element: <CategoryPage />,
  },
  {
    path: Paths.LOGIN_PAGE,
    element: <LoginPage />,
  },
  {
    path: Paths.MYACCOUNT_PAGE,
    element: <MyPage />,
  },
  {
    path: Paths.PRODUCT_DETAILS(':productId'),
    element: <ProductDetailsPage />,
  },
  {
    path: Paths.PRODUCT_ORDER,
    element: <ProductOrderPage />,
  },
  {
    path: Paths.REGISTER_PAGE,
    element: <RegisterPage />,
  },
]);

export default router;
