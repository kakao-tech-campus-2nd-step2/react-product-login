import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/members/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        authSessionStorage.set(JSON.stringify({ token: data.token, email: data.email }));
        const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
        window.location.replace(redirectUrl);
      } else if (response.status === 403) {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 에러 발생');
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
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
        <Button onClick={handleConfirm}>로그인</Button>
        <Footer>
          <RegisterLink onClick={() => navigate('/register')}>회원가입</RegisterLink>
        </Footer>
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

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const RegisterLink = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  text-decoration: underline;
`;