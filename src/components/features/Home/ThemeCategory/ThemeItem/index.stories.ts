import image from '@assets/images/theme.jpeg';
import { Meta, StoryObj } from '@storybook/react';
import ThemeItem, { ThemeItemProps } from '.';

const meta: Meta<ThemeItemProps> = {
  title: 'features/Home/ThemeCategory/ThemeItem',
  component: ThemeItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    image: { control: { type: 'text' } },
  },
};

export default meta;

type Story = StoryObj<ThemeItemProps>;

export const Default: Story = {
  args: {
    label: '럭셔리',
    image,
  },
};
