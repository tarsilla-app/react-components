import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Text } from '../src/text';

const meta = {
  title: 'Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      table: {
        type: { summary: 'text' },
      },
      options: ['text', 'number', 'email', 'password', 'tel'],
      description: 'input type',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder',
      table: {
        type: { summary: 'text' },
      },
    },
    style: {
      control: 'select',
      table: {
        type: { summary: 'text' },
      },
      options: ['rounded', 'line'],
      description: 'style type',
    },
    color: {
      control: 'color',
      table: {
        type: { summary: 'text' },
      },
      description: 'set color',
    },
    backgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
      },
      description: 'set background color',
    },
    width: {
      control: 'text',
      table: {
        type: { summary: 'text' },
      },
      description: 'width',
    },
    min: {
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
      description: 'min',
    },
    max: {
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
      description: 'max',
    },
    minLength: {
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
      description: 'minLength',
    },
    maxLength: {
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
      description: 'maxLength',
    },
    pattern: {
      control: 'text',
      table: {
        type: { summary: 'text' },
      },
      description: 'pattern',
    },
    required: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'if true, make select required',
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'if true, make select disabled',
    },
    debounceWait: {
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
      description: 'debounce wait',
    },
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
