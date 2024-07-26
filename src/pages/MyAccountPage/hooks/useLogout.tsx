import { useNavigate } from 'react-router-dom';

import { ROUTER_PATH } from '@/routes/path';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate(ROUTER_PATH.HOME);
  };

  return { handleLogout };
};
