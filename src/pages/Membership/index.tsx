import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePostMembership } from '@/api/hooks/usePostMembership';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

export const Membership = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { mutate } = usePostMembership();
  const { handleAuthInfo } = useAuth();

  const handleConfirm = () => {
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: () => {
          handleAuthInfo();
          navigate(RouterPath.home);
        },
      },
    );
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <Title>회원가입</Title>
        <UnderlineTextField
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></UnderlineTextField>
        <UnderlineTextField
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></UnderlineTextField>
        <Button onClick={handleConfirm}>가입하기</Button>
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

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const Title = styled.div`
  font-size: 20px;
`;
