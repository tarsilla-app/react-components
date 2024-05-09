import type { Meta, StoryObj } from '@storybook/react';

import { Test } from '../src/test';

const meta = {
  title: 'Test',
  component: Test,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    title: {
      control: 'text',
      description: 'Text title',
    },
  },
  args: { title: 'Title' },
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
