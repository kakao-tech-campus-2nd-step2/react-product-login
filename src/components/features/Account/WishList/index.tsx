import React from 'react';
import styled from '@emotion/styled';
import { useGetWishes } from '@apis/wish/hooks/useGetWishes';
import { CenteredContainer } from '@components/common';
import WishListItem from './WishLIstItem';

export default function WishList() {
  const { data: wishesData, refetch } = useGetWishes({ page: 0, size: 10, sort: 'createdDate,desc' });

  return (
    <CenteredContainer maxWidth="md">
      <WishListTitle>관심목록</WishListTitle>
      <WishListContainer>
        {wishesData?.content.map((wishItem) => (
          <WishListItem
            key={wishItem.id}
            id={wishItem.id}
            image={wishItem.product.imageUrl}
            name={wishItem.product.name}
            price={wishItem.product.price}
            onDelete={() => refetch()}
          />
        ))}
      </WishListContainer>
    </CenteredContainer>
  );
}

const WishListTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
`;

const WishListContainer = styled.ul`
  border: 1px solid #bbb;
  border-radius: 24px;
  padding: 36px;
  margin-bottom: 48px;
`;
