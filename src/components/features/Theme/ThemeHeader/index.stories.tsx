import React, { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { ROUTE_PATH } from '@routes/path';
import ThemeHeader from '.';

interface MockUseLocationDecoratorProps {
  state: {
    title: string;
    label: string;
    description?: string;
    backgroundColor: string;
  };
  children: ReactNode;
}

function MockUseLocationDecorator({ state, children }: MockUseLocationDecoratorProps) {
  return (
    <MemoryRouter initialEntries={[{ pathname: ROUTE_PATH.HOME, state }]}>
      <Routes>
        <Route path={ROUTE_PATH.HOME} element={children} />
      </Routes>
    </MemoryRouter>
  );
}

const meta: Meta<typeof ThemeHeader> = {
  title: 'features/Theme/ThemeHeader',
  component: ThemeHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockUseLocationDecorator
        state={{
          title: 'Title',
          label: 'Label',
          description: 'description.',
          backgroundColor: '#f3a2a2',
        }}
      >
        <Story />
      </MockUseLocationDecorator>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemeHeader>;

export const Default: Story = {};
