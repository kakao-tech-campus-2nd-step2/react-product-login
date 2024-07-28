import React from 'react';
import styled from '@emotion/styled';
import useDeleteWish from '@apis/wish/hooks/useDeleteWish';

export interface WishListItemProps {
  id: number;
  image: string;
  name: string;
  price: number;
  onDelete: () => void;
}

export default function WishListItem({ id, image, name, price, onDelete }: WishListItemProps) {
  const { mutate: deleteWish } = useDeleteWish({
    onSuccess: () => {
      onDelete();
    },
    onError: (error) => {
      console.error('Failed to delete wish item', error);
    },
  });

  const handleDelete = () => {
    deleteWish({ wishId: id });
  };

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
        <button onClick={handleDelete}>삭제하기</button>
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
