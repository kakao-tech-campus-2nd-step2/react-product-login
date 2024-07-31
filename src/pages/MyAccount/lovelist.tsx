import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishItem {
  id: number;
  product: Product;
}

const LoveList = () => {
  const [interestList, setInterestList] = useState<WishItem[]>([]);

  useEffect(() => {
    axios
      .get('/api/wishes')
      .then((response) => setInterestList(response.data.content))
      .catch((error) => console.error(error));
  }, []);

  const handleRemoveClick = async (id: number) => {
    try {
      await axios.delete(`/api/wishes/${id}`);
      setInterestList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('삭제 실패');
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      {interestList.map((item) => (
        <Box key={item.id} borderWidth="10px" borderRadius="lg" overflow="hidden" padding="100px">
          <Image src={item.product.imageUrl} alt={`Product ${item.product.name}`} />
          <Text fontWeight="bold">{item.product.name}</Text>
          <Text>{item.product.price}원</Text>
          <Button colorScheme="red" onClick={() => handleRemoveClick(item.id)}>
            관심 삭제
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default LoveList;
