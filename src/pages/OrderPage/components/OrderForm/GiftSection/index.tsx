import { Divider, Heading } from '@chakra-ui/react';

import { Container } from '@/components/ui/Layout/Container';

import { GiftInfo } from './GiftInfo';
import { GiftMessageField } from './GiftMessageField';

export const GiftSection = () => {
  return (
    <Container flexDirection="column">
      <Container
        flexDirection="column"
        alignItems="center"
        gap="1rem"
        css={{ padding: '3rem 4rem' }}
      >
        <Heading size="md">나에게 주는 선물</Heading>
        <GiftMessageField />
      </Container>
      <Divider borderTopWidth="0.5rem" />
      <GiftInfo />
    </Container>
  );
};
