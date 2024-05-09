import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '../src/loading';

const meta = {
  title: 'Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
