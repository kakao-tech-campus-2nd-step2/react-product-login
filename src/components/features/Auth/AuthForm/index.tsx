import React, { ChangeEvent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { InputField } from '@components/common';

export interface AuthFormProps {
  userInfo: {
    email: string;
    password: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  submitButton: ReactNode;
  isSignUp?: ReactNode;
}

export default function AuthForm({ userInfo, onChange, submitButton, isSignUp }: AuthFormProps) {
  return (
    <FormContainer>
      <InputContainer>
        <InputField
          label="이메일"
          labelFor="email"
          placeholder="이메일"
          type="text"
          name="email"
          size="large"
          onChange={onChange}
          value={userInfo.email}
          srOnly
        />
      </InputContainer>
      <InputContainer>
        <InputField
          label="비밀번호"
          labelFor="password"
          placeholder="비밀번호"
          type="password"
          name="password"
          size="large"
          onChange={onChange}
          value={userInfo.password}
          srOnly
        />
      </InputContainer>
      <ButtonContainer>{submitButton}</ButtonContainer>
      {isSignUp}
    </FormContainer>
  );
}

const FormContainer = styled.form`
  width: 580px;
  padding: 60px 52px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const InputContainer = styled.div`
  margin-bottom: 28px;

  &:last-of-type {
    margin-bottom: 60px;
  }
`;

const ButtonContainer = styled.div`
  width: 475px;
`;
