import Container from '@components/atoms/container/Container';
import Input from '@components/atoms/input/Input';
import { css } from '@emotion/react';
import Button from '@components/atoms/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useRef } from 'react';
import { Text } from '@chakra-ui/react';
import Paths from '@constants/Paths';
import AuthFormContainer from '@components/organisms/auth/AuthFormContainer';
import { LoginContext } from '@/providers/LoginContextProvider';

function RegisterForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername } = useContext(LoginContext);

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLoginClick = useCallback(() => {
    setIsLoggedIn(true);
    setUsername(idRef.current ? idRef.current.value : '');
    navigate(-1);
  }, [navigate, setIsLoggedIn, setUsername]);

  return (
    <AuthFormContainer>
      <Input
        elementSize={{
          width: '100%',
          height: '46px',
        }}
        placeholder="이름"
        ref={idRef}
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
        text="회원가입"
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
        <Link to={Paths.LOGIN_PAGE}>
          <Text fontSize="13px">로그인</Text>
        </Link>
        <Text fontSize="13px">아이디/비밀번호 찾기</Text>
      </Container>
    </AuthFormContainer>
  );
}

export default RegisterForm;
