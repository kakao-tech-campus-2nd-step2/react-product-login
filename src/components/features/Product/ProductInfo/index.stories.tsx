import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@assets/styles';
import ProductInfo from '.';

const meta: Meta<typeof ProductInfo> = {
  title: 'features/Product/ProductInfo',
  component: ProductInfo,
  tags: ['autodocs'],
  decorators: (Story) => (
    <ChakraProvider>
      <GlobalStyles />
      <Story />
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof ProductInfo>;

export const Default: Story = {};
