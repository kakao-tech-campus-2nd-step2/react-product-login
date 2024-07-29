import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const ProtectedRoute = () => {
  const { authInfo } = useAuth();

  return authInfo ? <Outlet /> : <Navigate to={ROUTER_PATH.LOGIN} replace />;
};
