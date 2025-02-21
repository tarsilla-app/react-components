import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '../src/loading/index.js';

const meta: Meta<typeof Loading> = {
  title: 'Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'id',
    },
    color: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: '#000000' },
      },
      description: 'set color',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 'id-123',
    color: '#000000',
  },
};
