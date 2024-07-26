import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '@context/auth/AuthProvider';
import GlobalStyles from '@assets/styles';
import ProductOrder from '.';

const meta: Meta<typeof ProductOrder> = {
  title: 'features/Product/ProductOrder',
  component: ProductOrder,
  tags: ['autodocs'],
  decorators: (Story) => (
    <ChakraProvider>
      <MemoryRouter>
        <AuthProvider>
          <GlobalStyles />
          <Story />
        </AuthProvider>
      </MemoryRouter>
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof ProductOrder>;

export const Default: Story = {};
