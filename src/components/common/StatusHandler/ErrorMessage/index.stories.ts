import { Meta, StoryObj } from '@storybook/react';
import ErrorMessage, { ErrorMessageProps } from '.';

const meta: Meta<ErrorMessageProps> = {
  title: 'common/StatusHandler/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { control: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<ErrorMessageProps>;

export const Default: Story = {
  args: {
    message: '데이터를 불러오는 중에 문제가 발생했습니다.',
  },
};
