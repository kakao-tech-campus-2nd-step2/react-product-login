import styled from '@emotion/styled';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BASE_URL, fetchInstance } from '@/api/instance';
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

  const handleConfirm = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetchInstance.post(
        `${BASE_URL}/api/members/login`,
        { email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const data = await response.data();
        authSessionStorage.set(data.token);

        const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
        return window.location.replace(redirectUrl);
      }
    } catch (error) {
      console.error('Failed sign in', error);
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
      </FormWrapper>
      <CustomButton onClick={() => window.location.replace('/signUp')}>회원가입</CustomButton>
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

const CustomButton = styled(Button)`
  max-width: 580px;
  background: none;
  :hover {
    background: none;
    text-decoration-line: underline;
  }
  :visited {
    outline: none;
    border: none;
  }
`;
