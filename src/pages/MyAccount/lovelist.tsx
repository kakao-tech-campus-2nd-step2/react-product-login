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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(`/api/wishes?page=${page}&size=10&sort=createdDate,desc`)
      .then((response) => {
        setInterestList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error(error));
  }, [page]);

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
        <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" padding="10px">
          <Image src={item.product.imageUrl} alt={item.product.name} />
          <Text fontWeight="bold">{item.product.name}</Text>
          <Button colorScheme="red" onClick={() => handleRemoveClick(item.id)}>
            관심 삭제
          </Button>
        </Box>
      ))}
      <Button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
        이전
      </Button>
      <Button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
      >
        다음
      </Button>
    </VStack>
  );
};

export default LoveList;
