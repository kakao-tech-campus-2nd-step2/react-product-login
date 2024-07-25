import Container from '@components/atoms/container/Container';
import { css } from '@emotion/react';
import loginLogo from '@assets/images/login_logo.svg';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paths from '@constants/Paths';
import RegisterForm from '@components/organisms/auth/RegisterForm';
import { LoginContext } from '@/providers/LoginContextProvider';

function RegisterPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [navigate, isLoggedIn]);

  return (
    <Container
      elementSize={{
        width: '100%',
        height: '100dvh',
      }}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <img
        css={css`
        width: 88px;
      `}
        src={loginLogo}
      />
      <RegisterForm />
    </Container>
  );
}

export default RegisterPage;
