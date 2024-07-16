import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const AuthRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={ROUTER_PATH.HOME} replace /> : <Outlet />;
};
