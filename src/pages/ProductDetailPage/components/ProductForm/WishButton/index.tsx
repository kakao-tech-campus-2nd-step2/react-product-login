import { Button, Text } from '@chakra-ui/react';

import heart from '@/assets/icons/heart-regular.svg';

import { Container } from '@/components/ui/Layout/Container';

export const WishButton = () => {
  return (
    <Button width="5rem" height="5rem">
      <Container flexDirection="column" alignItems="center">
        <img src={heart} alt="wish-icon" width={32} />
        <Text>38,201</Text>
      </Container>
    </Button>
  );
};
