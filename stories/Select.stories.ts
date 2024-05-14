import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Select } from '../src/select';

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      table: {
        type: { summary: 'text' },
      },
      description: 'placeholder',
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
    'style.selectedColor': {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'gray' },
      },
      description: 'set selected item color',
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
    options: {
      control: 'object',
      table: {
        type: { summary: 'array' },
      },
    },
    isMulti: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'if true, select is multi',
    },
    menuPlacement: {
      control: 'select',
      table: {
        type: { summary: 'text' },
      },
      options: ['auto', 'bottom', 'top'],
      description: 'style type',
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
    options: [
      {
        label: 'option 1',
        value: '1',
      },
      {
        label: 'option 2',
        value: '2',
      },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
