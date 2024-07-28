import { useAuth } from '@context/auth/useAuth';
import { ROUTE_PATH } from '@routes/path';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserInfoState {
  email: string;
  password: string;
}

export default function useAuthForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleLogin = () => {
    if (userInfo.email !== '' && userInfo.password !== '') {
      login(userInfo.email);
      navigate(ROUTE_PATH.HOME);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return {
    userInfo,
    handleChange,
    handleSubmit,
  };
}
