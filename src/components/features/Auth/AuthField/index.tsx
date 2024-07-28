import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@components/common';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm';
import useAuthForm from '../useAuthForm';

interface AuthFieldProps {
  isSignUp: boolean;
}

export default function AuthField({ isSignUp }: AuthFieldProps) {
  const { userInfo, handleChange, handleSubmit } = useAuthForm();

  return (
    <>
      <AuthForm
        userInfo={userInfo}
        onChange={handleChange}
        submitButton={
          <Button theme="kakao" size="large" onClick={handleSubmit}>
            {isSignUp ? '회원가입' : '로그인'}
          </Button>
        }
        isSignUp={
          !isSignUp && (
            <SignUpContainer>
              <Link to="/sign-up">회원가입</Link>
            </SignUpContainer>
          )
        }
      />
    </>
  );
}

const SignUpContainer = styled.div`
  padding-top: 20px;
  text-align: center;
`;
