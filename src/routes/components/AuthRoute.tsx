import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const AuthRoute = () => {
  const { authInfo } = useAuth();

  return authInfo ? <Navigate to={ROUTER_PATH.HOME} replace /> : <Outlet />;
};
