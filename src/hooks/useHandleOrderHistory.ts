import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '@/routes/path';
import type { OrderHistory } from '@/types';
import { orderHistorySessionStorage } from '@/utils/storage';

export const useHandleOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory>();
  const navigate = useNavigate();
  useEffect(() => {
    const prevOrderHistory = orderHistorySessionStorage.get();

    if (!prevOrderHistory) {
      alert('주문 내역이 없습니다.\n메인 화면으로 이동합니다.');

      navigate(RouterPath.home);
      return;
    }

    setOrderHistory(prevOrderHistory);
  }, [navigate]);

  return { orderHistory };
};
