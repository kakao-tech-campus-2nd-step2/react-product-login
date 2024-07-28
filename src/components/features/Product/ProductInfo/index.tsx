import React from 'react';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { Container } from '@components/common';
import WishButton from '../WishButton';

const IMAGE_SIZE = 450;

interface ProductInfoProps {
  name?: string;
  image?: string;
  price?: number;
}

export default function ProductInfo({ name, image, price }: ProductInfoProps) {
  return (
    <ProductContainer>
      <article>
        <Container justifyContent="space-between">
          <Image src={image} maxW={IMAGE_SIZE} maxH={IMAGE_SIZE} mr={6} data-testid="product-image" />
          <div>
            <ProductTitle data-testid="product-name">{name}</ProductTitle>
            <ProductPrice data-testid="product-price">{price}원</ProductPrice>
            <GiftInfo>
              <hr />
              <p>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</p>
              <hr />
            </GiftInfo>
            <WishButton />
          </div>
        </Container>
      </article>
    </ProductContainer>
  );
}

const ProductContainer = styled.main`
  max-width: 748px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  padding-top: 24px;
`;

const ProductPrice = styled.p`
  font-size: 30px;
  padding-top: 16px;
`;

const GiftInfo = styled.div`
  padding-top: 48px;
  font-size: 14px;
  font-weight: 700;

  hr:first-of-type {
    margin-bottom: 14px;
  }

  hr:last-of-type {
    margin-top: 14px;
  }
`;
