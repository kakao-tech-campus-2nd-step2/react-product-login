import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTER_PATH.LOGIN} replace />;
};
