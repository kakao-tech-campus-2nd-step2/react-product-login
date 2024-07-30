import { useState } from 'react';

export const useWish = () => {
  const [isWish, setIsWish] = useState(false);

  const handleWishClick = () => {
    if (!isWish) {
      // 위시 등록 api 요청
      alert('위시에 담았어요!');
    } else {
      // 위시 삭제 api 요청
      alert('취소! 위시에서 삭제할게요.');
    }

    setIsWish(!isWish);
  };

  return {
    isWish,
    handleWishClick,
  };
};
