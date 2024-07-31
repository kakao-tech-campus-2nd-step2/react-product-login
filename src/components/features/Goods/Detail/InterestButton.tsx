import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  productId: string;
};

export const InterestButton = ({ productId }: Props) => {
  const [isInterested, setIsInterested] = useState(false);

  const handleInterestClick = async () => {
    try {
      await axios.post('/api/wishes', { productId });
      setIsInterested(true);
      alert('관심 등록 완료');
    } catch (error) {
      console.error(error);
      alert('관심 등록 실패');
    }
  };

  return (
    <Button onClick={handleInterestClick} colorScheme={isInterested ? 'blue' : 'gray'}>
      {isInterested ? '관심 등록 완료' : '관심 등록button'}
    </Button>
  );
};
