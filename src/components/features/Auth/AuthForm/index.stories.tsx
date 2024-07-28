import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@components/common';
import AuthContext from '@context/auth/AuthContext';
import { Global } from '@emotion/react';
import resetStyles from '@assets/styles/global/resetStyles';
import AuthForm, { AuthFormProps } from '.';

const meta: Meta<AuthFormProps> = {
  title: 'features/Auth/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const { isAuthenticated } = context.parameters;
      return (
        <AuthContext.Provider value={{ isAuthenticated, login: () => {}, logout: () => {} }}>
          <MemoryRouter>
            <Global styles={resetStyles} />
            <Story />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<AuthFormProps>;

export const Login: Story = {
  args: {
    userInfo: { email: '', password: '' },
    onChange: () => {},
    submitButton: (
      <Button theme="kakao" size="large" onClick={() => alert('로그인')}>
        로그인
      </Button>
    ),
    isSignUp: <Link to="/sign-up">회원가입</Link>,
  },
};

export const SignUp: Story = {
  args: {
    userInfo: { email: '', password: '' },
    onChange: () => {},
    submitButton: (
      <Button theme="kakao" size="large" onClick={() => alert('회원가입')}>
        회원가입
      </Button>
    ),
    isSignUp: null,
  },
};
