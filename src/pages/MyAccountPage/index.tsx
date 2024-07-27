import { Navigate } from 'react-router-dom';

import BaseLayout from '@/layouts/BaseLayout';
import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

import { Container } from '@/components/ui/Layout/Container';

import { MyAccountConent } from './components/MyAccountContent';
import { WishList } from './components/WishList';

export const MyAccountPage = () => {
  const { authInfo } = useAuth();

  if (!authInfo) {
    return <Navigate to={ROUTER_PATH.LOGIN} replace />;
  }

  return (
    <BaseLayout>
      <Container flexDirection="column" alignItems="center">
        <MyAccountConent userName={authInfo.name} />
        <WishList />
      </Container>
    </BaseLayout>
  );
};
