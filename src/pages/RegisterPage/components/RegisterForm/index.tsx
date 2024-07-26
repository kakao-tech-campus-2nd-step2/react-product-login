import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { register } from '@/api/services/auth/register';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';
import { useLoginSuccess } from '@/pages/LoginPage/hooks/handleLoginSuccess';
import { LoginFields, LoginSchema } from '@/schema/index';

import { Alert } from '@/components/ui/Dialog/Alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';

import { buttonStyle, formContainerStyle } from './styles';

export const RegisterForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState('');

  const { handleLoginSuccess } = useLoginSuccess();
  const { mutate, status } = useMutation({
    mutationFn: register,
    onSuccess: (data) => handleLoginSuccess(data),
    onError: () => {
      setAlertMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR);
    },
  });

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (alertMessage) {
      onOpen();
    } else {
      onClose();
    }
  }, [alertMessage, onClose, onOpen]);

  const handleSubmit = form.handleSubmit(() => mutate(form.getValues()));

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} css={formContainerStyle}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  placeholder=" test@gmail.com"
                  variant="flushed"
                  focusBorderColor="black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  placeholder=" ******"
                  variant="flushed"
                  focusBorderColor="black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          width="30rem"
          onClick={handleSubmit}
          disabled={status === 'pending'}
          css={buttonStyle}
        >
          회원가입
        </Button>
        {isOpen && (
          <Alert message={alertMessage} isOpen={isOpen} onClose={onClose} />
        )}
      </form>
    </Form>
  );
};
