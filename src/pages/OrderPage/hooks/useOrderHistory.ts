import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTER_PATH } from '@/routes/path';
import { OrderHistory } from '@/types/orderType';

export const useOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory>({
    productId: 1,
    productQuantity: 1,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const prevOrderHistory = location.state;

    if (!prevOrderHistory) {
      navigate(ROUTER_PATH.HOME);
      return;
    }

    setOrderHistory(prevOrderHistory);
  }, [navigate, location.state]);

  return { orderHistory };
};
