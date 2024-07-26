import { Navigate } from 'react-router-dom';

import BaseLayout from '@/layouts/BaseLayout';
import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

import { MyAccountConent } from './components/MyAccountContent';

export const MyAccountPage = () => {
  const { authInfo } = useAuth();

  if (!authInfo) {
    return <Navigate to={ROUTER_PATH.LOGIN} replace />;
  }

  return (
    <BaseLayout>
      <MyAccountConent userName={authInfo.name} />
    </BaseLayout>
  );
};
