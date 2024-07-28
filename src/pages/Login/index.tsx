// src/pages/Login/index.tsx
import styled from '@emotion/styled';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://api.example.com/api/members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: id, password }),
      });

      if (response.ok) {
        const data = await response.json();
        authSessionStorage.set({ email: id, token: data.token });

        const redirectUrl = queryParams.get('redirect') ?? '/';
        navigate(redirectUrl);
        window.location.reload();
      } else {
        alert('로그인 실패, 아이디와 비밀번호를 다시 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생: ', error);
      alert('로그인 요청 중 오류가 발생하였습니다.');
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이메일" value={id} onChange={(e) => setId(e.target.value)} />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleConfirm}>로그인</Button>
        <Spacing height={20} />
        <Button onClick={() => navigate('/register')}>회원가입</Button>
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
