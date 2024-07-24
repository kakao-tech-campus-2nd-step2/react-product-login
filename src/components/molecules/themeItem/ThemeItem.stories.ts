import type { Meta, StoryObj } from '@storybook/react';
import CategoryItem from './CategoryItem';

const meta: Meta<typeof CategoryItem> = {
  component: CategoryItem,
};

export default meta;

type Story = StoryObj<typeof CategoryItem>;

export const ThemeItemTest: Story = {
  args: {
    categoryId: 'small',
  },
};
