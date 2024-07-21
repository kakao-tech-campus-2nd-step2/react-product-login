import { useEffect, useState } from 'react';
import { orderHistoryStorage } from '@utils/storage';
import Paths from '@constants/Paths';
import { useNavigate } from 'react-router-dom';
import { OrderHistoryData } from '@/types';

function useOrderHistory() {
  const [orderHistory] = useState<OrderHistoryData | undefined>(orderHistoryStorage.get());
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderHistory) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [navigate, orderHistory]);

  return { orderHistory };
}

export default useOrderHistory;
