import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@pages/MainPage';
import Paths from '@constants/Paths';
import ThemePage from '@pages/ThemePage';
import LoginPage from '@pages/LoginPage';
import MyPage from '@pages/MyPage';
import ProductDetailsPage from '@pages/ProductDetailsPage';
import ProductOrderPage from '@pages/ProductOrderPage';

const router = createBrowserRouter([
  {
    path: Paths.MAIN_PAGE,
    element: <MainPage />,
  },
  {
    path: Paths.THEME_PAGE(':themeKey'),
    element: <ThemePage />,
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
]);

export default router;