import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { login } from '@/api/services/auth/login';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { useAuth } from '@/provider/auth/useAuth';
import { LoginFields, LoginSchema } from '@/schema/index';

import { Alert } from '@/components/ui/Dialog/Alert';

import { buttonStyle, formContainerStyle } from './styles';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setEmail } = useAuth();
  const [alertMessage, setAlertMessage] = useState('');
  const { mutate, status } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.token);
      setEmail(data.email);
      navigate(-1);
    },
    onError: () => {
      setAlertMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR);
    },
  });

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(
    () => mutate(form.getValues()),
    (errors) => {
      const errorMessages =
        Object.values(errors).flatMap((error) => error.message)[0] || '';

      setAlertMessage(errorMessages);
    }
  );

  useEffect(() => {
    if (alertMessage) {
      onOpen();
    } else {
      onClose();
    }
  }, [alertMessage, onClose, onOpen]);

  return (
    <form onSubmit={(e) => e.preventDefault()} css={formContainerStyle}>
      <Input
        {...form.register('email')}
        placeholder="이메일"
        variant="flushed"
        focusBorderColor="black"
      />
      <Input
        {...form.register('password')}
        type="password"
        placeholder="비밀번호"
        variant="flushed"
        focusBorderColor="black"
      />
      <Button
        type="submit"
        width="30rem"
        onClick={handleSubmit}
        disabled={status === 'pending'}
        css={buttonStyle}
      >
        로그인
      </Button>
      {isOpen && (
        <Alert message={alertMessage} isOpen={isOpen} onClose={onClose} />
      )}
    </form>
  );
};
