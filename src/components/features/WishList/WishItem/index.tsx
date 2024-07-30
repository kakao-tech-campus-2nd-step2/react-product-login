import { Box, Button, Flex, Heading, ListItem, Text } from '@chakra-ui/react';

import { Image } from '@/components/common/Image';
import type { WishListItem } from '@/types';

type Props = {
  item: WishListItem;
  onDelete: (id: number) => void;
};

export const WishItemContainer = ({ item, onDelete }: Props) => {
  return (
    <ListItem key={item.id} p={4} shadow="md" borderWidth="2px" borderRadius="md">
      <Flex align="center">
        <Image src={item.product.imageUrl} alt={item.product.name} width="100px" />
        <Box ml={4}>
          <Heading as="h3" size="sm">
            {item.product.name}
          </Heading>
          <Text fontSize="lg" fontWeight="700">
            {item.product.price.toLocaleString()} 원
          </Text>
        </Box>
        <Button ml={16} onClick={() => onDelete(item.id)}>
          삭제
        </Button>
      </Flex>
    </ListItem>
  );
};
