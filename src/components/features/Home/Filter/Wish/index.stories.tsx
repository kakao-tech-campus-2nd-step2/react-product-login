import React from 'react';
import FilterProvider from '@context/filter/FilterProvider';
import { Meta, StoryObj } from '@storybook/react';
import { useFilter } from '@context/filter/useFilter';
import Wish, { WishProps } from '.';

function WishDecorator(StoryComponent: any) {
  return (
    <FilterProvider>
      <WishContextWrapper StoryComponent={StoryComponent} />
    </FilterProvider>
  );
}

function WishContextWrapper({ StoryComponent }: { StoryComponent: any }) {
  const { selectedWish, selectWish } = useFilter();
  return <StoryComponent selectedTarget={selectedWish} selectTarget={selectWish} />;
}

const meta: Meta<WishProps> = {
  title: 'features/Home/Filter/Wish',
  component: Wish,
  tags: ['autodocs'],
  decorators: [WishDecorator],
};

export default meta;

type Story = StoryObj<WishProps>;

export const Default: Story = {
  args: {
    selectedWish: 'MANY_RECEIVE',
    selectWish: () => {},
  },
};
