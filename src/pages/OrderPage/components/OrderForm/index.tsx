import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

import { Divider } from '@chakra-ui/react';
import { z } from 'zod';

import { OrderSchema } from '@/schema/index';

import { Content } from '@/components/Content';
import { Form } from '@/components/ui/Form';

import { GiftSection } from './GiftSection';
import { PaymentSection } from './PaymentSection';

type OrderFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
  handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
};

export const OrderForm = ({ form, handleSubmit }: OrderFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <Content height="92vh" maxWidth="1280px">
          <Divider orientation="vertical" />
          <GiftSection />
          <Divider orientation="vertical" />
          <PaymentSection />
          <Divider orientation="vertical" />
        </Content>
      </form>
    </Form>
  );
};
