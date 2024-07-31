import styled from '@emotion/styled';
import React, { useState } from 'react';

type FavoriteButtonProps = {
  productId: string;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    
    // TODO: API 연동하여 관심 등록 상태 서버에 전송

    // 관심 등록 성공 시 메시지 노출
    if (!isFavorite) {
      alert('관심 등록 완료');
    }
  };

  return (
    <Button onClick={handleFavoriteClick} isFavorite={isFavorite}>
      {isFavorite ? '관심 등록됨' : '관심 등록'}
    </Button>
  );
};

const Button = styled.button<{ isFavorite: boolean }>`
  background-color: ${({ isFavorite }) => (isFavorite ? '#ff6347' : '#f0f0f0')};
  color: ${({ isFavorite }) => (isFavorite ? '#fff' : '#000')};
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isFavorite }) => (isFavorite ? '#ff4500' : '#e0e0e0')};
  }
`;

export default FavoriteButton;
