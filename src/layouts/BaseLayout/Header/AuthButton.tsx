import { Link } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

import { Button } from '@/components/ui/Button';

export const AuthButton = () => {
  const { authInfo } = useAuth();

  return (
    <Link to={authInfo ? ROUTER_PATH.MY_ACCOUNT : ROUTER_PATH.LOGIN}>
      <Button theme="outline" width="4rem">
        {authInfo ? '내 계정' : '로그인'}
      </Button>
    </Link>
  );
};
