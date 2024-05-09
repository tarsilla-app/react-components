import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TextArea } from '../src/textarea';

const meta = {
  title: 'TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
