import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import GlobalStyles from '@assets/styles';
import QuantitySelector from '.';
import { QuantityValues } from '..';

const meta: Meta<typeof QuantitySelector> = {
  title: 'features/Product/ProductOrder/QuantitySelector',
  component: QuantitySelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm<QuantityValues>({
        defaultValues: {
          count: 1,
        },
      });

      return (
        <ChakraProvider>
          <GlobalStyles />
          <FormProvider {...methods}>
            <Story />
          </FormProvider>
        </ChakraProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof QuantitySelector>;

function QuantitySelectorWrapper() {
  const { setValue } = useForm<QuantityValues>();
  return <QuantitySelector setValue={setValue} />;
}

export const Default: Story = {
  render: () => <QuantitySelectorWrapper />,
};
