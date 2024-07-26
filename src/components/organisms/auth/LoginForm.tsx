import Container from '@components/atoms/container/Container';
import Input from '@components/atoms/input/Input';
import { css } from '@emotion/react';
import Button from '@components/atoms/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useRef } from 'react';
import AuthFormContainer from '@components/organisms/auth/AuthFormContainer';
import Paths from '@constants/Paths';
import { Text } from '@chakra-ui/react';
import { requestAuth } from '@utils/query';
import { tokenStorage } from '@utils/storage';
import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { LoginContext } from '@/providers/LoginContextProvider';

function LoginForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername } = useContext(LoginContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLoginClick = useCallback(async () => {
    if (!emailRef.current || !passwordRef.current) return;

    try {
      const authResult = await requestAuth({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }, 'login');
      setIsLoggedIn(true);
      setUsername(authResult.email);
      tokenStorage.set(authResult.token);
      navigate(-1);
    } catch (e) {
      if (!isAxiosError(e)) {
        console.error(e);

        return;
      }

      if (e.response?.status === StatusCodes.FORBIDDEN) {
        alert('아이디나 비밀번호가 일치하지 않습니다.');
      }
    }
  }, [navigate, setIsLoggedIn, setUsername]);

  return (
    <AuthFormContainer>
      <Input
        elementSize={{
          width: '100%',
          height: '46px',
        }}
        placeholder="이름"
        ref={emailRef}
      />
      <div css={css`
            height: 16px;
        `}
      />
      <Input
        elementSize={{
          width: '100%',
          height: '46px',
        }}
        placeholder="비밀번호"
        type="password"
        ref={passwordRef}
      />
      <div css={css`
            height: 60px;
        `}
      />
      <Button
        theme="kakao"
        elementSize={{
          width: '100%',
          height: '60px',
        }}
        text="로그인"
        onClick={onLoginClick}
      />
      <Container
        justifyContent="center"
        elementSize="full-width"
        padding="15px 0"
        cssProps={{
          gap: '15px',
        }}
      >
        <Link to={Paths.REGISTER_PAGE}>
          <Text fontSize="13px">회원가입</Text>
        </Link>
        <Text fontSize="13px">아이디/비밀번호 찾기</Text>
      </Container>
    </AuthFormContainer>
  );
}

export default LoginForm;
