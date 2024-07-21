import { useForm } from 'react-hook-form';

import { Divider, Heading } from '@chakra-ui/react';
import { z } from 'zod';

import { OrderSchema } from '@/schema/index';

import { Container } from '@/components/ui/Layout/Container';

import { GiftDetail } from './GiftDetail';
import { GiftMessage } from './GiftMessage';

type GiftSectionProps = {
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
};

export const GiftSection = ({ form }: GiftSectionProps) => {
  return (
    <Container flexDirection="column">
      <Container
        flexDirection="column"
        alignItems="center"
        gap="1rem"
        css={{ padding: '3rem 4rem' }}
      >
        <Heading size="md">나에게 주는 선물</Heading>
        <GiftMessage form={form} />
      </Container>
      <Divider borderTopWidth="0.5rem" />
      <GiftDetail />
    </Container>
  );
};
