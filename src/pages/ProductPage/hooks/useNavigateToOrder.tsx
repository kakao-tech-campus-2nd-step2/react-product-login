import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const useNavigateToOrder = (productId: number, quantity: number) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const navigateToOrder = () => {
    if (!isLoggedIn) {
      const confirmed = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?'
      );

      if (confirmed) navigate(ROUTER_PATH.LOGIN);
      return;
    }

    const state = {
      productId,
      quantity,
    };

    navigate(ROUTER_PATH.ORDER, { state });
  };

  return { navigateToOrder };
};
