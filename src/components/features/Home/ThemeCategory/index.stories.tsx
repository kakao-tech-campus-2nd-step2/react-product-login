import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import GlobalStyles from '@assets/styles';
import ThemeCategory from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof ThemeCategory> = {
  title: 'features/Home/ThemeCategory',
  component: ThemeCategory,
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

type Story = StoryObj<typeof ThemeCategory>;

export const Default: Story = {};
