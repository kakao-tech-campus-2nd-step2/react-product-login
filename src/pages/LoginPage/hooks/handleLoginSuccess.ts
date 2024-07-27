import { useNavigate } from 'react-router-dom';

import { LoginResponse } from '@/api/services/auth/login';
import { useAuth } from '@/provider/auth/useAuth';
import { authLocalStorage } from '@/utils/storage';

export const useLoginSuccess = () => {
  const navigate = useNavigate();
  const { updateAuthInfo } = useAuth();

  const handleLoginSuccess = (authInfo: LoginResponse) => {
    authLocalStorage.set(authInfo);
    updateAuthInfo(authInfo);
    navigate(-1);
  };

  return { handleLoginSuccess };
};
