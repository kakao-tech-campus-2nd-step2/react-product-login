import { useNavigate } from 'react-router-dom';

import { LoginResposne } from '@/api/services/auth/login';
import { useAuth } from '@/provider/auth/useAuth';

export const useLoginSuccess = () => {
  const navigate = useNavigate();
  const { setEmail } = useAuth();

  const handleLoginSuccess = ({ token, email }: LoginResposne) => {
    sessionStorage.setItem('token', token);
    setEmail(email);
    navigate(-1);
  };

  return { handleLoginSuccess };
};
