import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { OrderDataFormValues } from '@pages/Order';
import GlobalStyles from '@assets/styles';
import ReceiptForm from '.';

const meta: Meta<typeof ReceiptForm> = {
  title: 'features/Order/Payment/ReceiptForm',
  component: ReceiptForm,
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

type Story = StoryObj<typeof ReceiptForm>;

export const Default: Story = {};
