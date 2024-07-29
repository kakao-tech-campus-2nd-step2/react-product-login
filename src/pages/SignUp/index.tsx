import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { User } from '@/api/hooks/useGetUser';
import { getSignUp } from '@/api/hooks/useGetUser';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';

export default () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<User>();

  const onSubmit = (data: User) => {
    getSignUp(data.id, data.password).then((result) => {
      if (result) {
        alert('회원가입이 완료되었습니다.');
        navigate('/login', { replace: true });
      } else {
        alert('회원가입에 실패했습니다.');
      }
    });
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="이름" {...register('id', { required: true })} disabled={isSubmitting} />
        <Spacing />
        <Input
          type="password"
          placeholder="비밀번호"
          {...register('password', { required: true })}
          disabled={isSubmitting}
        />

        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <Button type="submit">회원가입</Button>
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

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.form`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;
