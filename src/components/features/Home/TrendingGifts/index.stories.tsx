import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FilterProvider from '@context/filter/FilterProvider';
import TrendingGifts from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof TrendingGifts> = {
  title: 'features/Home/TrendingGifts',
  component: TrendingGifts,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <Story />
        </FilterProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TrendingGifts>;

export const Default: Story = {};
