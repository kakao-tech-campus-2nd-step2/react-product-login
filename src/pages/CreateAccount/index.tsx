import styled from '@emotion/styled';
import { useState } from 'react';

import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';

export const CreateAccount = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleConfirm = () => {};

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
        <Button onClick={handleConfirm}>회원가입</Button>
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
