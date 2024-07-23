import React from 'react';
import styled from '@emotion/styled';
import { Container, Image } from '@components/common';

const IMAGE_SIZE = 90;
const IMAGE_RADIUS = 32;

export interface ThemeItemProps {
  image: string;
  label: string;
}

export default function ThemeItem({ image, label }: ThemeItemProps) {
  return (
    <ThemeItemContainer>
      <Container flexDirection="column" alignItems="center">
        <Image src={image} width={IMAGE_SIZE} height={IMAGE_SIZE} radius={IMAGE_RADIUS} alt={label} />
        <CategoryName>{label}</CategoryName>
      </Container>
    </ThemeItemContainer>
  );
}

const ThemeItemContainer = styled.div`
  padding: 25px 35px;
  cursor: pointer;
`;

const CategoryName = styled.p`
  padding-top: 7px;
`;
