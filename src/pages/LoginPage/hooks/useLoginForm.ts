import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLogin = (username: string) => {
    login(username);
    navigate(-1);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current?.value.trim() || '';
    const password = passwordRef.current?.value || '';

    if (!username || !password) {
      /* eslint-disable no-alert */
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    onLogin(username);
  };

  return {
    usernameRef,
    passwordRef,
    handleLogin,
  };
};
