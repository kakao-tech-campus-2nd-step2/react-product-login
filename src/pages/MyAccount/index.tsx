import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';
import { Container, VStack, Box, CloseButton, Text } from '@chakra-ui/react';

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Container w="100%">
      <Wrapper>
        {authInfo?.name}님 안녕하세요! <Spacing height={64} />
        <Button
          size="small"
          theme="darkGray"
          onClick={handleLogout}
          style={{
            maxWidth: '200px',
          }}
        >
          로그아웃
        </Button>
      </Wrapper>
      <VStack spacing="24px">
        <Text fontWeight="bold" fontSize="20px">
          관심 상품
        </Text>
        <StyledBox alignItems="center">
          <Text>찜한 상품 이름</Text>
          <CloseButton />
        </StyledBox>
        <StyledBox>
          <Text>찜한 상품 이름</Text>
          <CloseButton />
        </StyledBox>
        <StyledBox>
          <Text>찜한 상품 이름</Text>
          <CloseButton />
        </StyledBox>
        <StyledBox>
          <Text>찜한 상품 이름</Text>
          <CloseButton />
        </StyledBox>
      </VStack>
    </Container>
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

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  background-color: #fdffbc;
  width: 100%;
  padding: 16px;
`;
