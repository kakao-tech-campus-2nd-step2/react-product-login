import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Image, List, ListItem, Text } from '@chakra-ui/react';

const favoriteItems = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://via.placeholder.com/100',
    description: 'This is product 1',
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://via.placeholder.com/100',
    description: 'This is product 2',
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://via.placeholder.com/100',
    description: 'This is product 3',
  },
];

const FavoritesPage = () => {
  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        관심 목록
      </Text>
      <List spacing={3}>
        {favoriteItems.map((item) => (
          <ListItem key={item.id} p={4} borderWidth="1px" borderRadius="lg">
            <Flex align="center">
              <Image boxSize="100px" src={item.image} alt={item.name} mr={4} />
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
                <Text>{item.description}</Text>
              </Box>
              <IconButton
                icon={<StarIcon />}
                aria-label="Remove from favorites"
                variant="outline"
                colorScheme="red"
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FavoritesPage;
