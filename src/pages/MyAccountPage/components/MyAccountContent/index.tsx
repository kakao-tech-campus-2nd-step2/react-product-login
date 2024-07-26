import { useLogout } from '@/pages/MyAccountPage/hooks/useLogout';
import { useAuth } from '@/provider/auth/useAuth';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout/Container';

import { buttonStyle, countainerStyle, titleStyle } from './styles';

export const MyAccountConent = () => {
  const { email } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="3rem"
      css={countainerStyle}
    >
      <h1 css={titleStyle}>{email}님 안녕하세요!</h1>
      <Button
        size="medium"
        theme="darkGray"
        width="14rem"
        onClick={handleLogout}
        css={buttonStyle}
      >
        로그아웃
      </Button>
    </Container>
  );
};
