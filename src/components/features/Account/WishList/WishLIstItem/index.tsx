import React from 'react';
import styled from '@emotion/styled';

export interface WishListItemProps {
  image: string;
  name: string;
  price: number;
}

export default function WishListItem({ image, name, price }: WishListItemProps) {
  return (
    <WishListItemContainer>
      <InnerContainer>
        <WishListDetail>
          <ImageContainer>
            <img src={image} alt="product" />
          </ImageContainer>
          <div>
            <Name>{name}</Name>
            <Price>{price}원</Price>
          </div>
        </WishListDetail>
        <button>삭제하기</button>
      </InnerContainer>
    </WishListItemContainer>
  );
}

const WishListItemContainer = styled.li`
  display: flex;
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const WishListDetail = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  img {
    max-width: 200px;
  }

  margin-right: 24px;
`;

const Name = styled.p`
  font-size: 24px;
  font-weight: 700px;
`;

const Price = styled.span`
  font-size: 18px;
`;
