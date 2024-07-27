import styled from '@emotion/styled';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Spacing } from '@/components/common/layouts/Spacing';
import { EnrollForm } from '@/components/features/Login/EnrollForm';
import { LoginForm } from '@/components/features/Login/LoginForm';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const [isEnrollButtonClicked, setIsEnrollButtonClicked] = useState(false);

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value);
  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.target.value);
  const onNavigationButtonClick = () => setIsEnrollButtonClicked(!isEnrollButtonClicked);

  const handleConfirm = () => {
    // TODO: API 연동 전까지 임시 로그인 처리
    authSessionStorage.set(email);

    const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
    return window.location.replace(redirectUrl);
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        {isEnrollButtonClicked ? (
          <EnrollForm
            email={email}
            setEmail={onEmailChange}
            password={password}
            setPassword={onPasswordChange}
            handleConfirm={handleConfirm}
          />
        ) : (
          <LoginForm
            email={email}
            setEmail={onEmailChange}
            password={password}
            setPassword={onPasswordChange}
            handleConfirm={handleConfirm}
          />
        )}
        <Spacing
          height={{
            initial: 10,
            sm: 20,
          }}
        />
        <UnderlineButton onClick={onNavigationButtonClick}>
          {isEnrollButtonClicked ? '로그인하기' : '회원가입하기'}
        </UnderlineButton>
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

const UnderlineButton = styled.button`
  text-decoration: underline;
`;
