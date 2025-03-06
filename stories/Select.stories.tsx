/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ActionMeta } from 'react-select';

import { Option, Select } from '../src/select/index.js';

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 350,
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
    noOptionsMessage: {
      control: 'text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'No options' },
      },
      description: 'no options message',
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
        defaultValue: { summary: 'inherit' },
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
    selectedItemColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'blue' },
      },
      description: 'set selected item color',
    },
    disabledItemColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'gray' },
      },
      description: 'set disabled item color',
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
      control: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
        defaultValue: { summary: 'false' },
      },
      description: 'if true, select is multi',
    },
    isSearchable: {
      control: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'if true, select is searchable',
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
      description: 'value',
    },
    defaultValue: {
      control: 'select',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      options: ['1', '2', '3', '4'],
      description: 'default value',
    },
  },
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story: any, { args }: any) => {
      const {
        layoutType,
        color,
        backgroundColor,
        disabledColor,
        disabledBackgroundColor,
        selectedItemColor,
        disabledItemColor,
        width,
        value,
        ...rest
      } = args;
      const [_value, _setValue] = useState(value);
      const updatedArgs = {
        ...rest,
        style: {
          layoutType,
          color,
          backgroundColor,
          disabledColor,
          disabledBackgroundColor,
          selectedItemColor,
          disabledItemColor,
          width,
        },
        value: _value,
        onChange: (value: string | string[] | undefined, actionMeta: ActionMeta<Option>) => {
          _setValue(value);
          console.log('onChange', value, actionMeta);
        },
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
    options: [
      {
        label: 'option 1',
        value: '1',
      },
      {
        label: 'option 2',
        value: '2',
        isDisabled: true,
      },
      {
        label: 'Group',
        options: [
          {
            label: 'option 3',
            value: '3',
          },
          {
            label: 'option 4',
            value: '4',
            isDisabled: true,
          },
        ],
      },
    ],
    placeholder: 'Selecione',
    noOptionsMessage: 'Não encontrado',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedItemColor: 'blue',
    disabledItemColor: 'gray',
    width: '120px',
    required: false,
    disabled: false,
    debounceWait: undefined,
    isMulti: false,
    isSearchable: false,
    menuPlacement: 'bottom',
    defaultValue: '1',
    value: undefined,
  },
};

export const Debounce: Story = {
  args: {
    id: 'id-123',
    options: [
      {
        label: 'option 1',
        value: '1',
      },
      {
        label: 'option 2',
        value: '2',
        isDisabled: true,
      },
      {
        label: 'Group',
        options: [
          {
            label: 'option 3',
            value: '3',
          },
          {
            label: 'option 4',
            value: '4',
            isDisabled: true,
          },
        ],
      },
    ],
    placeholder: 'Selecione',
    noOptionsMessage: 'Não encontrado',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedItemColor: 'blue',
    disabledItemColor: 'gray',
    width: '120px',
    required: false,
    disabled: false,
    debounceWait: 2000,
    isMulti: false,
    isSearchable: false,
    menuPlacement: 'bottom',
    defaultValue: '1',
    value: undefined,
  },
};

export const Disabled: Story = {
  args: {
    id: 'id-123',
    placeholder: 'Selecione',
    noOptionsMessage: 'Não encontrado',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedItemColor: 'blue',
    disabledItemColor: 'gray',
    width: '120px',
    required: false,
    disabled: true,
    debounceWait: undefined,
    isMulti: false,
    isSearchable: false,
    menuPlacement: 'bottom',
    defaultValue: undefined,
    value: undefined,
  },
};

export const Searchable: Story = {
  args: {
    id: 'id-123',
    options: [
      {
        label: 'option 1',
        value: '1',
      },
      {
        label: 'option 2',
        value: '2',
        isDisabled: true,
      },
      {
        label: 'Group',
        options: [
          {
            label: 'option 3',
            value: '3',
          },
          {
            label: 'option 4',
            value: '4',
            isDisabled: true,
          },
        ],
      },
    ],
    placeholder: 'Selecione',
    noOptionsMessage: 'Não encontrado',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedItemColor: 'blue',
    disabledItemColor: 'gray',
    width: '120px',
    required: false,
    disabled: false,
    debounceWait: undefined,
    isMulti: false,
    isSearchable: true,
    menuPlacement: 'bottom',
    defaultValue: undefined,
    value: undefined,
  },
};

export const MultiSelect: Story = {
  args: {
    id: 'id-123',
    options: [
      {
        label: 'option 1',
        value: '1',
      },
      {
        label: 'option 2',
        value: '2',
        isDisabled: true,
      },
      {
        label: 'Group',
        options: [
          {
            label: 'option 3',
            value: '3',
          },
          {
            label: 'option 4',
            value: '4',
            isDisabled: true,
          },
        ],
      },
    ],
    placeholder: 'Selecione',
    noOptionsMessage: 'Não encontrado',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedItemColor: 'blue',
    disabledItemColor: 'gray',
    width: '120px',
    required: false,
    disabled: false,
    debounceWait: undefined,
    isMulti: true,
    isSearchable: false,
    menuPlacement: 'bottom',
    defaultValue: ['1', '3'],
    value: undefined,
  },
};

export const MultiSelectDisabled: Story = {
  args: {
    id: 'id-123',
    placeholder: 'Selecione',
    noOptionsMessage: 'Não encontrado',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedItemColor: 'blue',
    disabledItemColor: 'gray',
    width: '120px',
    required: false,
    disabled: true,
    debounceWait: undefined,
    isMulti: true,
    isSearchable: false,
    menuPlacement: 'bottom',
    defaultValue: undefined,
    value: undefined,
  },
};

export const MultiSelectSearchable: Story = {
  args: {
    id: 'id-123',
    options: [
      {
        label: 'option 1',
        value: '1',
      },
      {
        label: 'option 2',
        value: '2',
        isDisabled: true,
      },
      {
        label: 'Group',
        options: [
          {
            label: 'option 3',
            value: '3',
          },
          {
            label: 'option 4',
            value: '4',
            isDisabled: true,
          },
        ],
      },
    ],
    placeholder: 'Selecione',
    noOptionsMessage: 'Não encontrado',
    // @ts-ignore
    layoutType: 'rounded',
    color: 'black',
    backgroundColor: 'white',
    disabledColor: 'gray',
    disabledBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedItemColor: 'blue',
    disabledItemColor: 'gray',
    width: '120px',
    required: false,
    disabled: false,
    debounceWait: undefined,
    isMulti: true,
    isSearchable: true,
    menuPlacement: 'bottom',
    defaultValue: undefined,
    value: undefined,
  },
};
