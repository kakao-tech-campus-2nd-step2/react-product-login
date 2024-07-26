import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import usePostLogin from '@/api/hooks/usePostLogin';
import usePostRegister from '@/api/hooks/usePostRegister';
import type { PostLoginResponseBody, PostRegisterResponseBody } from '@/api/type';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [newId, setNewId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [queryParams] = useSearchParams();

  const { mutateAsync: login } = usePostLogin();
  const { mutateAsync: register } = usePostRegister();

  const afterGetToken = (authToken: string) => {
    authSessionStorage.set(authToken);

    const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
    return window.location.replace(redirectUrl);
  };

  const handleConfirm = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    login({ email: id, password })
      .then((res: PostLoginResponseBody) => {
        return afterGetToken(res.token);
      })
      .catch((err) => {
        alert(err?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.');
      });
  };

  const handleRegister = () => {
    if (!newId || !newPassword) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    register({ email: newId, password: newPassword })
      .then((res: PostRegisterResponseBody) => {
        return afterGetToken(res.token);
      })
      .catch((err) => {
        alert(err?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.');
      });
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <Accordion allowToggle defaultIndex={1}>
          <AccordionItem w="full">
            <FormHeader as={AccordionButton}>회원가입</FormHeader>
            <AccordionPanel>
              <UnderlineTextField
                placeholder="이메일"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
              />
              <Spacing />
              <UnderlineTextField
                type="password"
                placeholder="비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Spacing
                height={{
                  initial: 40,
                  sm: 60,
                }}
              />
              <Button onClick={handleRegister}>로그인</Button>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem w="full">
            <FormHeader as={AccordionButton}>로그인</FormHeader>
            <AccordionPanel>
              <UnderlineTextField
                placeholder="이메일"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
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
              <Button onClick={handleConfirm}>로그인</Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
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

const FormHeader = styled.div`
  width: 100%;
  max-width: 580px;
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
