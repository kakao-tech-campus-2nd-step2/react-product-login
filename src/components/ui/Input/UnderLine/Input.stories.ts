import type { Meta, StoryObj } from '@storybook/react';

import { UderLineInput } from '.';

const meta: Meta<typeof UderLineInput> = {
  title: 'Example/Form/UderLineInput',
  component: UderLineInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    invalid: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'large', 'response'],
    },
  },
  args: { placeholder: 'placeholder' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
