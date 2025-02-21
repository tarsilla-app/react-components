/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TextArea } from '../src/textarea/index.js';

const meta: Meta<typeof TextArea> = {
  title: 'TextArea',
  component: TextArea,
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
    disabledColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'gray' },
      },
      description: 'set disabled color',
    },
    disabledBackgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'rgba(128, 128, 128, 0.2)' },
      },
      description: 'set disabled background color',
    },
    width: {
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
      control: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      description: 'if true, make text disabled',
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
    rows: {
      control: 'number',
      disable: true,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'text area number of rows',
    },
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
  decorators: [
    (Story: any, { args }: any): JSX.Element => {
      const { layoutType, color, backgroundColor, disabledColor, disabledBackgroundColor, width, ...rest } = args;
      const updatedArgs = {
        ...rest,
        style: { layoutType, color, backgroundColor, disabledColor, disabledBackgroundColor, width },
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
    placeholder: 'Placeholder',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    required: false,
    disabled: false,
    debounceWait: 10,
    rows: 5,
  },
};

export const Disabled: Story = {
  args: {
    id: 'id-123',
    placeholder: 'Placeholder',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    required: false,
    disabled: true,
    debounceWait: 10,
    rows: 5,
  },
};
