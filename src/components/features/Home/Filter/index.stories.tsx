import React from 'react';
import FilterProvider from '@context/filter/FilterProvider';
import { Meta, StoryObj } from '@storybook/react';
import Filter from '.';

const meta: Meta<typeof Filter> = {
  title: 'features/Home/Filter',
  component: Filter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FilterProvider>
        <Story />
      </FilterProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Default: Story = {};
