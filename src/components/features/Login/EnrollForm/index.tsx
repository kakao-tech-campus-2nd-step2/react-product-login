import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import type { ChangeEventHandler } from 'react';

import { registerUser } from '@/api/utils';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';

export interface IEnrollForm {
  email: string;
  setEmail: ChangeEventHandler<HTMLInputElement>;
  password: string;
  setPassword: ChangeEventHandler<HTMLInputElement>;
  handleConfirm: () => void;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const EnrollForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleConfirm,
}: IEnrollForm) => {
  //NOTE: 훅으로 빼서 handleConfirm을 매개변수로 받아올 수도 있다.
  const enrollMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      handleConfirm();
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });

  const handleEnroll = async () => {
    if (!isValidEmail(email) || !isValidPassword(password)) {
      alert('적절한 이메일과 비밀번호를 입력해주세요');
      return;
    }

    enrollMutation.mutate({ email, password });
  };

  return (
    <form>
      <GrayLabel>
        회원가입을 위한 이메일을 입력해 주세요.
        <Checkmark data-testid="emailValidation" show={email !== ''}>
          {isValidEmail(email) ? '✅' : '❌'}
        </Checkmark>
        <UnderlineTextField placeholder="이메일" value={email} onChange={setEmail} />
      </GrayLabel>
      <Spacing />
      <GrayLabel>
        회원가입을 위한 비밀번호를 입력해 주세요.
        <Checkmark data-testid="passwordValidation" show={password !== ''}>
          {isValidPassword(password) ? '✅' : '❌'}
        </Checkmark>
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={setPassword}
        />
      </GrayLabel>
      <Spacing
        height={{
          initial: 40,
          sm: 60,
        }}
      />
      <Button type="button" onClick={handleEnroll}>
        회원가입
      </Button>
    </form>
  );
};

const GrayLabel = styled.label`
  color: #ccc;
  cursor: pointer;
`;

const Checkmark = styled.span<{ show: boolean }>`
  display: ${(props) => (props.show ? 'inline' : 'none')};
  margin-left: 8px;
  font-size: 16px;
  text-align: center;
`;
