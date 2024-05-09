import type { Meta, StoryObj } from '@storybook/react';

import { Test2 } from '../src/test2';

const meta = {
  title: 'Test2',
  component: Test2,
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
} satisfies Meta<typeof Test2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
