import { Box, Button, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import LoveList from './lovelist';

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);
    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <VStack spacing={8}>
        <Box>{authInfo?.name}님 안녕하세요!</Box>
        <Spacing height={64} />
        <Button size="small" onClick={handleLogout} style={{ maxWidth: '200px' }}>
          로그아웃
        </Button>
        <LoveList />
      </VStack>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
