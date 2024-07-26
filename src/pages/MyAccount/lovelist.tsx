import { Box, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface InterestItem {
  id: string;
  image_url: string; // API 응답 데이터에 맞춰 속성 이름 수정
  name: string;
  description: string;
}

const LoveList = () => {
  const [interestList, setInterestList] = useState<InterestItem[]>([]);

  useEffect(() => {
    // API 호출
    axios
      .get('https://api.example.com/interest-list') // 실제 API 엔드포인트로 변경
      .then((response) => setInterestList(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <VStack spacing={4} align="stretch">
      {interestList.map((item) => (
        <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" padding="10px">
          <Image src={item.image_url} alt={item.name} />
          <Text fontWeight="bold">{item.name}</Text>
          <Text>{item.description}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default LoveList;
