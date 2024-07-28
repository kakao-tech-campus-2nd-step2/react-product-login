import { StarIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface WishButtonProps {
  isFavorited: boolean;
  onClick?: () => void;
}

const WishButton = ({ isFavorited, onClick }: WishButtonProps) => {
  return (
    <IconButton
      aria-label={isFavorited ? '위시리스트 삭제' : '위시리스트 추가'}
      icon={<StarIcon color={isFavorited ? 'yellow.300' : 'gray.200'} />}
      onClick={onClick}
      variant="outline"
      borderRadius="4px"
      fontSize="30px"
      p="5px"
      m="10px"
      size="lg"
    />
  );
};

export default WishButton;
