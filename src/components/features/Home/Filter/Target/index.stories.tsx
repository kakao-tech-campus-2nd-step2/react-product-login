import React from 'react';
import FilterProvider from '@context/filter/FilterProvider';
import { useFilter } from '@context/filter/useFilter';
import { Meta, StoryObj } from '@storybook/react';
import Target, { TargetProps } from '.';

function FilterDecorator(StoryComponent: any) {
  return (
    <FilterProvider>
      <FilterContextWrapper StoryComponent={StoryComponent} />
    </FilterProvider>
  );
}

function FilterContextWrapper({ StoryComponent }: { StoryComponent: any }) {
  const { selectedTarget, selectTarget } = useFilter();
  return <StoryComponent selectedTarget={selectedTarget} selectTarget={selectTarget} />;
}

const meta: Meta<TargetProps> = {
  title: 'features/Home/Filter/Target',
  component: Target,
  tags: ['autodocs'],
  decorators: [FilterDecorator],
};

export default meta;

type Story = StoryObj<TargetProps>;

export const Default: Story = {
  args: {
    selectedTarget: 'ALL',
    selectTarget: () => {},
  },
};
