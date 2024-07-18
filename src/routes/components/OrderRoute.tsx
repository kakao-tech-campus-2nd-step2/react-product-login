import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTER_PATH } from '@/routes/path';

export const OrderRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return location.state ? children : <Navigate to={ROUTER_PATH.HOME} replace />;
};
