import React from 'react';
import styled from '@emotion/styled';
import { Image } from '@components/common';
import AuthField from '@components/features/Auth/AuthField';
import kakaoLogo from '@assets/images/kakao-logo.svg';
import { useLocation } from 'react-router-dom';

const IMAGE_ALT = '카카오 로고';
const IMAGE_SIZE = 88;

export default function Auth() {
  const location = useLocation();
  const isSignUp = location.pathname.includes('sign-up');

  return (
    <AuthContainer>
      <ImageContainer>
        <Image src={kakaoLogo} alt={IMAGE_ALT} width={IMAGE_SIZE} height={IMAGE_SIZE} />
      </ImageContainer>
      <AuthField isSignUp={isSignUp} />
    </AuthContainer>
  );
}

const AuthContainer = styled.section`
  height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
