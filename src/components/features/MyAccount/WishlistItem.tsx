import { Box, Button, Image, Text } from '@chakra-ui/react';

interface WishlistItemProps {
  name: string;
  price: number;
  imageUrl: string;
}

const WishlistItem = ({ name, price, imageUrl }: WishlistItemProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={4}
      boxShadow="sm"
      display="flex"
      alignItems="center"
      gap={4}
      width="800px"
      height="115px"
      bg="white"
      borderColor="gray.200"
    >
      <Image src={imageUrl} alt={name} boxSize="85px" objectFit="cover" />
      <Box flex="1" p={2}>
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {price.toLocaleString()}원
        </Text>
      </Box>
      <Button colorScheme="gray" size="sm">
        삭제
      </Button>
    </Box>
  );
};

export default WishlistItem;
