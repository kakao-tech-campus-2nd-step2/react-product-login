import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const useLogout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTER_PATH.HOME);
  };

  return { handleLogout };
};
