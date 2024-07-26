import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useLogin } from '@/api/hooks/useGetLogin';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const message = location.state?.successMessage;
    if (message) {
      setSuccessMessage(message);
      navigate(RouterPath.login, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      authSessionStorage.set(data.token);
      navigate(RouterPath.home);
    },
    onError: (error) => {
      // 에러 처리 로직은 제거하거나 주석 처리합니다.
      console.error('Login error:', error);
    },
  });

  const handleConfirm = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    login({ email, password });
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <FormWrapper>
        <UnderlineTextField
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleConfirm} disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
        <SignUpLinkWrapper>
          <SignUpLink to={RouterPath.register}>회원가입</SignUpLink>
        </SignUpLinkWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;

const SignUpLinkWrapper = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const SignUpLink = styled(Link)`
  color: #1a73e8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.div`
  color: green;
  margin-bottom: 20px;
  text-align: center;
`;
