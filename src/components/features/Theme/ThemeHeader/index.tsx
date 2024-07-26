import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { CenteredContainer } from '@components/common';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@routes/path';

interface LocationState {
  title: string;
  label: string;
  description?: string;
  backgroundColor: string;
}

export default function ThemeHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state) navigate(ROUTE_PATH.HOME);
  }, [state, navigate]);

  if (!state) return null;

  const { title, label, description, backgroundColor } = state;

  return (
    <ThemeHeaderContainer color={backgroundColor}>
      <CenteredContainer maxWidth="md">
        <Label>{label}</Label>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CenteredContainer>
    </ThemeHeaderContainer>
  );
}

const ThemeHeaderContainer = styled.section<{ color?: string }>`
  margin-top: 60px;
  background-color: ${({ color }) => color};
  padding: 50px 0;
`;

const Label = styled.p`
  font-size: 20px;
  color: #ffffffb3;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  padding-top: 12px;
`;

const Description = styled.p`
  font-size: 24px;
  color: #ffffff8c;
  padding-top: 12px;
`;
