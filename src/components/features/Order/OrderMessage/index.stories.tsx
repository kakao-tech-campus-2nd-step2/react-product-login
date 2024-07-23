import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { OrderDataFormValues } from '@pages/Order';
import GlobalStyles from '@assets/styles';
import OrderMessage from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof OrderMessage> = {
  title: 'features/Order/OrderMessage',
  component: OrderMessage,
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
          <QueryClientProvider client={queryClient}>
            <FormProvider {...methods}>
              <GlobalStyles />
              <Story />
            </FormProvider>
          </QueryClientProvider>
        </ChakraProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof OrderMessage>;

export const Default: Story = {};
