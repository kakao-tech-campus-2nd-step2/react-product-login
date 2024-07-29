import styled from '@emotion/styled';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { login, signUp } from '@/utils/auth';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleConfirm = async () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      let response;
      if (isSignUp) {
        response = await signUp(id, password);
        if (response.success) {
          alert('회원가입이 완료되었습니다. 로그인 해주세요.');
          setIsSignUp(false);
        } else {
          throw new Error(response.message);
        }
      } else {
        response = await login(id, password);
        if (response.success) {
          authSessionStorage.set(response.token);
          const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
          window.location.replace(redirectUrl);
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이름" value={id} onChange={(e) => setId(e.target.value)} />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <Button onClick={handleConfirm}>{isSignUp ? '회원가입' : '로그인'}</Button>
        <Spacing
          height={{
            initial: 20,
            sm: 40,
          }} />
        <Button onClick={toggleSignUp}>{isSignUp ? '로그인' : '회원가입'}</Button>
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
