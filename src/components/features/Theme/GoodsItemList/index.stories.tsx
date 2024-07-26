import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import GlobalStyles from '@assets/styles';
import GoodsItemList from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof GoodsItemList> = {
  title: 'features/Theme/GoodsItemList',
  component: GoodsItemList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <GlobalStyles />
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GoodsItemList>;

export const Default: Story = {};
