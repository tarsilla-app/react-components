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
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'placeholder',
      table: {
        type: { summary: 'text' },
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'style.type': {
      control: 'select',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'rounded' },
      },
      options: ['rounded', 'line'],
      description: 'style type',
    },
    'style.color': {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'black' },
      },
      description: 'set color',
    },
    'style.backgroundColor': {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
      },
      description: 'set background color',
    },
    'style.width': {
      control: 'text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
      },
      description: 'width',
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
