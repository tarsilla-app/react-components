/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Text } from '../src/text';

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
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
    type: {
      control: 'select',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'text' },
      },
      options: ['text', 'number', 'email', 'password', 'tel'],
      description: 'input type',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
    },
    style: {
      control: 'object',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
      description: 'style',
    },
    // @ts-ignore
    layoutType: {
      control: 'select',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'rounded' },
      },
      options: ['rounded', 'line'],
      description: 'layout type',
    },
    color: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'black' },
      },
      description: 'set color',
    },
    backgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
      },
      description: 'set background color',
    },
    width: {
      control: 'text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
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
        defaultValue: { summary: 'undefined' },
      },
      description: 'debounce wait',
    },
    value: {
      control: false,
      disable: true,
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'value',
    },
    defaultValue: {
      control: 'text',
      disable: true,
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'default value',
    },
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
  decorators: [
    (Story: any, { args }: any): JSX.Element => {
      const { layoutType, color, backgroundColor, width, ...rest } = args;
      const updatedArgs = {
        ...rest,
        style: { layoutType, color, backgroundColor, width },
      };
      return <Story args={updatedArgs} />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    placeholder: 'Placeholder',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'inherit',
    width: '150px',
    required: false,
    disabled: false,
    debounceWait: 10,
  },
};
