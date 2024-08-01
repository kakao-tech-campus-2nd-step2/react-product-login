import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/Auth'; // assuming you have this hook to get auth info

type FavoriteItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export const MyAccountPage = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const navigate = useNavigate();
  const authInfo = useAuth();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleRemove = (id: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Assuming you store the auth token in localStorage
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <Box p="20px">
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Text fontSize="2xl" fontWeight="bold">
          {authInfo ? `안녕하세요, ${authInfo.name}님!` : '안녕하세요!'}
        </Text>
        <Button colorScheme="blue" onClick={handleLogout}>
          로그아웃
        </Button>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        나의 관심 상품
      </Text>
      {favorites.length === 0 ? (
        <Text>관심 상품이 없습니다.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {favorites.map((item) => (
            <Flex key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Image src={item.imageUrl} alt={item.name} boxSize="100px" objectFit="cover" mr="4" />
                <Box>
                  <Text fontSize="lg" fontWeight="semibold">{item.name}</Text>
                  <Text>{item.price}원</Text>
                </Box>
              </Flex>
              <Button colorScheme="red" onClick={() => handleRemove(item.id)}>삭제</Button>
            </Flex>
          ))}
        </VStack>
      )}
    </Box>
  );
};
