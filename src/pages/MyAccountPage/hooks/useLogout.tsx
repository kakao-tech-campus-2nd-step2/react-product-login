import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';
import { authLocalStorage } from '@/utils/storage';

export const useLogout = () => {
  const navigate = useNavigate();
  const { updateAuthInfo } = useAuth();

  const handleLogout = () => {
    authLocalStorage.remove();
    updateAuthInfo();
    navigate(ROUTER_PATH.HOME);
  };

  return { handleLogout };
};
