import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';
import { RouterPath } from '@/routes/path';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  const handleConfirm = async () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/api/members/login', {
        email: id,
        password,
      });

      const { token } = response.data;
      authSessionStorage.set(token);

      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
      return window.location.replace(redirectUrl);
    } catch (error: any) {
      const message = error.response?.data?.message || '로그인에 실패했습니다.';
      alert(message);
    }
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
        <Button onClick={handleConfirm}>로그인</Button>
        <RegisterWrapper>
          <Link to={RouterPath.register}>회원가입</Link>
        </RegisterWrapper>
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

const RegisterWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-size: 12px;
`;
