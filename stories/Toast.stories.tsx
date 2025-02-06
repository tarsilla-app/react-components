import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from '../src/toast';

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
