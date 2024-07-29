import BaseLayout from '@/layouts/BaseLayout';
import { useAuth } from '@/provider/auth/useAuth';

import { UpDownDots } from '@/components/Loading/UpDownDots';
import { Container } from '@/components/ui/Layout/Container';

import { MyAccountConent } from './components/MyAccountContent';
import { WishList } from './components/WishList';

export const MyAccountPage = () => {
  const { authInfo } = useAuth();

  if (!authInfo) {
    return <UpDownDots />;
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
