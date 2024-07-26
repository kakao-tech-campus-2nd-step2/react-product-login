import React from 'react';
import { Container } from '@components/common';
import styled from '@emotion/styled';
import { FILTER_WISHS, WishType } from '../constants';
import WishItem from './WishItem';

export interface WishProps {
  selectedWish: WishType;
  selectWish: (wish: WishType) => void;
}

export default function Wish({ selectedWish, selectWish }: WishProps) {
  return (
    <WishContainer>
      <Container justifyContent="center" alignItems="center">
        {FILTER_WISHS.map(({ id, wish, rankType }) => (
          <WishItem key={id} wish={wish} selected={selectedWish === rankType} onSelect={() => selectWish(rankType)} />
        ))}
      </Container>
    </WishContainer>
  );
}

const WishContainer = styled.div`
  width: 100%;
  background-color: #e6f1ff;
  border-radius: 12px;
`;
