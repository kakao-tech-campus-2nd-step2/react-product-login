import { Container } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { Wishlist } from '@/components/features/MyAccount/Wishlist';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <ProfileWrapper>
          <Spacing height={32} />
          <p>
            {authInfo?.name}님<br />
            안녕하세요!
          </p>
          <Spacing height={64} />
          <Button size="small" theme="darkGray" onClick={handleLogout}>
            로그아웃
          </Button>
        </ProfileWrapper>
        <Wishlist />
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin: 0 auto;
  display: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
`;

const ProfileWrapper = styled.div`
  min-width: 15vh;
  padding: 20px;
  text-align: center;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 700;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;
