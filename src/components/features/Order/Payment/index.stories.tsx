import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { OrderDataFormValues } from '@pages/Order';
import GlobalStyles from '@assets/styles';
import Payment from '.';

const meta: Meta<typeof Payment> = {
  title: 'features/Order/Payment',
  component: Payment,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<OrderDataFormValues>({
        defaultValues: {
          message: '',
          hasCashReceipt: false,
          cashReceiptType: '개인소득공제',
          cashReceiptNumber: '',
        },
      });

      return (
        <ChakraProvider>
          <FormProvider {...methods}>
            <GlobalStyles />
            <Story />
          </FormProvider>
        </ChakraProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Payment>;

export const Default: Story = {};
