import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FilterProvider from '@context/filter/FilterProvider';
import RankingList from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof RankingList> = {
  title: 'features/Home/RankingList',
  component: RankingList,
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

type Story = StoryObj<typeof RankingList>;

export const Default: Story = {};
