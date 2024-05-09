import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from '../src/toast';

const meta = {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
