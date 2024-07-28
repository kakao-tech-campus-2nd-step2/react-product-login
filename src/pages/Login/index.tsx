import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';
export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  const handleConfirm = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    authSessionStorage.set(id);

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const currentuser = storedUsers.find((user: { id: string; password:string;}) => user.id === id && user.password === password);

    if (!currentuser) {
      alert('아이디가 틀렸습니다.');
      return;
    }
    sessionStorage.setItem('id', id);

    const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
    window.location.replace(redirectUrl);
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
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
        <ButtonContainer>
          <Button onClick={handleConfirm}>로그인</Button>
          <Link to={RouterPath.account}>
            <Button>회원가입</Button>
          </Link>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > * {
    flex: 1;
  }

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;
