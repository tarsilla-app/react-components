/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Select } from '../src/select';

const meta: Meta<typeof Select> = {
  title: 'MultiSelect',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 150,
        iframeWidth: 400,
      },
    },
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
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Select' },
      },
      description: 'placeholder',
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
      description: 'style type',
    },
    color: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'black' },
      },
      description: 'set color',
    },
    selectedColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'gray' },
      },
      description: 'set selected item color',
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
      control: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      description: 'if true, select is multi',
    },
    menuPlacement: {
      control: 'select',
      table: {
        type: { summary: 'text' },
      },
      options: ['auto', 'bottom', 'top'],
      description: 'menu placement',
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
      options: [
        {
          label: 'option 1',
          value: '1',
        },
        {
          label: 'option 1',
          value: '1',
        },
      ],
      description: 'value',
    },
    defaultValue: {
      control: 'multi-select',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      options: ['1', '2'],
      description: 'default value',
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
  decorators: [
    (Story: any, { args }: any): JSX.Element => {
      const { layoutType, color, selectedColor, backgroundColor, width, ...rest } = args;
      const updatedArgs = {
        ...rest,
        style: { layoutType, color, selectedColor, backgroundColor, width },
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
    placeholder: 'Select',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    selectedColor: 'gray',
    backgroundColor: 'inherit',
    width: '100px',
    required: false,
    disabled: false,
    debounceWait: 10,
    isMulti: true,
    menuPlacement: 'bottom',
    defaultValue: ['1', '2'],
    value: undefined,
  },
};
