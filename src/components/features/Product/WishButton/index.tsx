import React from 'react';
import { Button } from '@components/common';

export default function WishButton() {
  const handleClick = () => {
    console.info('clicked!');
  };

  return (
    <Button theme="primary" size="small" onClick={handleClick}>
      관심목록 추가하기
    </Button>
  );
}
