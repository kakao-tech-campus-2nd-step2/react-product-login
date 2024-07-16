import { Link } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

import { Button } from '@/components/ui/Button';

export const AuthButton = () => {
  const { isLoggedIn } = useAuth();

  const linkTo = isLoggedIn ? ROUTER_PATH.MY_ACCOUNT : ROUTER_PATH.LOGIN;
  const text = isLoggedIn ? '내 계정' : '로그인';

  return (
    <Link to={linkTo}>
      <Button theme="outline" width="4rem">
        {text}
      </Button>
    </Link>
  );
};
