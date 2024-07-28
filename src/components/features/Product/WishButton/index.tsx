import React from 'react';
import { Button } from '@components/common';
import { useParams } from 'react-router-dom';
import useAddWishMutation from '@apis/wish/hooks/useAddWish';

const SUCCESS_ADD_WISH_ALERT = '관심등록 완료';
export default function WishButton() {
  const { productId } = useParams<{ productId: string }>();
  const { data, mutate } = useAddWishMutation();

  const handleClick = () => {
    alert(SUCCESS_ADD_WISH_ALERT);
    console.info(data);
  };

  return (
    <Button theme="primary" size="small" onClick={handleClick}>
      관심목록 추가하기
    </Button>
  );
}
