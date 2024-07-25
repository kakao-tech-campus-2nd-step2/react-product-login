import { Navigate, Outlet } from 'react-router-dom';

import { getDynamicPath } from '../path';

import { useAuth } from '@/provider/Auth';

export const PrivateRoute = () => {
  const authInfo = useAuth();

  if (!authInfo) {
    return <Navigate to={getDynamicPath.login()} />;
  }

  return <Outlet />;
};
