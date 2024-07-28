import { Text } from '@chakra-ui/layout';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const SignupPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    {
      axios
        .post('/api/members/register', {
          email: id,
          password: password,
        })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          authSessionStorage.set(token);
        })
        .catch((error) => {
          console.error('Signup failed:', error);
        });

      return window.location.replace('/home');
    }
  };

  return (
    <Wrapper>
      <Text fontSize="30px" pb="15px" fontWeight={500}>
        SignUp
      </Text>
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
        <Button onClick={handleSignup}>회원가입</Button>
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

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;
