import { useNavigate } from 'react-router-dom';

import { LoginResponse } from '@/api/services/auth/login';

export const useLoginSuccess = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (authInfo: LoginResponse) => {
    sessionStorage.setItem('authInfo', JSON.stringify(authInfo));
    navigate(-1);
  };

  return { handleLoginSuccess };
};
