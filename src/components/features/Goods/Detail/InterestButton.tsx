import { Button } from '@chakra-ui/react';
import { useState } from 'react';

import { useAddToWishlist } from '@/hooks/useAddToWishlist';

type Props = {
  productId: string;
};

export const InterestButton = ({ productId }: Props) => {
  const { addToWishlist, loading } = useAddToWishlist();
  const [isInterested, setIsInterested] = useState(false);

  const handleInterestClick = async () => {
    await addToWishlist(Number(productId));
    setIsInterested(true);
  };

  return (
    <Button
      onClick={handleInterestClick}
      colorScheme={isInterested ? 'blue' : 'gray'}
      isLoading={loading}
    >
      {isInterested ? '관심 등록 완료' : '관심 등록'}
    </Button>
  );
};
