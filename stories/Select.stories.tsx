import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';
import { ActionMeta } from 'react-select';
import { fn } from 'storybook/test';

import { Option, Select, SelectProps } from '../src/select/index.js';

type StyleDecoratorProps = {
  backgroundColor?: string;
  color?: string;
  disabledBackgroundColor?: string;
  disabledColor?: string;
  disabledItemColor?: string;
  layoutType?: 'line' | 'rounded' | undefined;
  selectedItemColor?: string;
  value?: string | string[] | undefined;
  width?: string;
};

const StyleDecorator: Decorator<SelectProps<Option>> = (Story, { args }) => {
  const {
    backgroundColor,
    color,
    disabledBackgroundColor,
    disabledColor,
    disabledItemColor,
    layoutType,
    selectedItemColor,
    value: _value,
    width,
    ...rest
  } = args as StyleDecoratorProps;
  const [value, setValue] = useState(_value);
  return (
    <Story
      args={{
        ...rest,
        onChange: (value: string | string[] | undefined, _actionMeta: ActionMeta<Option>) => {
          setValue(value);
        },
        theme: {
          backgroundColor,
          color,
          disabledBackgroundColor,
          disabledColor,
          disabledItemColor,
          layoutType,
          selectedItemColor,
          width,
        },
        value,
      }}
    />
  );
};

const meta: Meta<SelectProps<Option> & StyleDecoratorProps> = {
  args: {
    onChange: fn(),
    options: [
      {
        label: 'option 1',
        value: '1',
      },
      {
        isDisabled: true,
        label: 'option 2',
        value: '2',
      },
      {
        label: 'Group',
        options: [
          {
            label: 'option 3',
            value: '3',
          },
          {
            isDisabled: true,
            label: 'option 4',
            value: '4',
          },
        ],
      },
    ],
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
      description: 'set background color',
      table: {
        defaultValue: { summary: 'white' },
        type: { summary: 'text' },
      },
    },
    color: {
      control: 'color',
      description: 'set color',
      table: {
        defaultValue: { summary: 'inherit' },
        type: { summary: 'text' },
      },
    },
    debounceWait: {
      control: 'number',
      description: 'debounce wait',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    defaultValue: {
      control: 'select',
      description: 'default value',
      options: ['1', '2', '3', '4'],
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'text' },
      },
    },
    disabled: {
      control: false,
      description: 'if true, make select disabled',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    disabledBackgroundColor: {
      control: 'color',
      description: 'set disabled background color',
      table: {
        defaultValue: { summary: 'rgba(128, 128, 128, 0.2)' },
        type: { summary: 'text' },
      },
    },
    disabledColor: {
      control: 'color',
      description: 'set disabled color',
      table: {
        defaultValue: { summary: 'gray' },
        type: { summary: 'text' },
      },
    },
    disabledItemColor: {
      control: 'color',
      description: 'set disabled item color',
      table: {
        defaultValue: { summary: 'gray' },
        type: { summary: 'text' },
      },
    },
    id: {
      control: 'text',
      description: 'id',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'text' },
      },
    },
    isMulti: {
      control: false,
      description: 'if true, select is multi',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isSearchable: {
      control: false,
      description: 'if true, select is searchable',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    layoutType: {
      control: 'select',
      description: 'layout type',
      options: ['rounded', 'line'],
      table: {
        defaultValue: { summary: 'rounded' },
        type: { summary: 'text' },
      },
    },
    menuPlacement: {
      control: 'select',
      description: 'menu placement',
      options: ['auto', 'bottom', 'top'],
      table: {
        type: { summary: 'text' },
      },
    },
    noOptionsMessage: {
      control: 'text',
      description: 'no options message',
      table: {
        defaultValue: { summary: 'No options' },
        type: { summary: 'text' },
      },
    },
    options: {
      control: 'object',
      table: {
        type: { summary: 'array' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'placeholder',
      table: {
        defaultValue: { summary: 'Select' },
        type: { summary: 'text' },
      },
    },
    required: {
      control: 'boolean',
      description: 'if true, make select required',
      table: {
        type: { summary: 'boolean' },
      },
    },
    selectedItemColor: {
      control: 'color',
      description: 'set selected item color',
      table: {
        defaultValue: { summary: 'blue' },
        type: { summary: 'text' },
      },
    },
    theme: {
      control: 'object',
      description: 'theme',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
    },
    value: {
      control: false,
      description: 'value',
      disable: true,
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'text' },
      },
    },
    width: {
      control: 'text',
      description: 'width',
      table: {
        defaultValue: { summary: 'inherit' },
        type: { summary: 'text' },
      },
    },
  },
  component: Select,
  decorators: [StyleDecorator],
  parameters: {
    docs: {
      story: {
        iframeHeight: 350,
        iframeWidth: 400,
        inline: false,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Select',
};

export default meta;
type Story = StoryObj<SelectProps<Option> & StyleDecoratorProps>;

export const Default: Story = {
  args: {
    id: 'id-123',
  },
};

export const Line: Story = {
  args: {
    id: 'id-123',
    layoutType: 'line',
  },
};

export const Debounce: Story = {
  args: {
    debounceWait: 2000,
    id: 'id-123',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
  },
};

export const LineDisabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
    layoutType: 'line',
  },
};

export const Placeholder: Story = {
  args: {
    id: 'id-123',
    placeholder: 'Placeholder',
  },
};

export const LinePlaceholder: Story = {
  args: {
    id: 'id-123',
    layoutType: 'line',
    placeholder: 'Placeholder',
  },
};

export const Searchable: Story = {
  args: {
    id: 'id-123',
    isSearchable: true,
  },
};

export const LineSearchable: Story = {
  args: {
    id: 'id-123',
    isSearchable: true,
    layoutType: 'line',
  },
};

export const MultiSelect: Story = {
  args: {
    id: 'id-123',
    isMulti: true,
  },
};

export const LineMultiSelect: Story = {
  args: {
    id: 'id-123',
    isMulti: true,
    layoutType: 'line',
  },
};

export const MultiSelectDisabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
    isMulti: true,
  },
};

export const LineMultiSelectDisabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
    isMulti: true,
    layoutType: 'line',
  },
};

export const MultiSelectSearchable: Story = {
  args: {
    id: 'id-123',
    isMulti: true,
    isSearchable: true,
  },
};

export const LineMultiSelectSearchable: Story = {
  args: {
    id: 'id-123',
    isMulti: true,
    isSearchable: true,
    layoutType: 'line',
  },
};

export const Styled: Story = {
  args: {
    backgroundColor: 'yellow',
    color: 'blue',
    disabledItemColor: 'red',
    id: 'id-123',
    selectedItemColor: 'green',
  },
};

export const StyledDisabled: Story = {
  args: {
    disabled: true,
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabledColor: 'red',
    id: 'id-123',
  },
};

export const StyledLine: Story = {
  args: {
    backgroundColor: 'yellow',
    color: 'blue',
    disabledItemColor: 'red',
    id: 'id-123',
    layoutType: 'line',
    selectedItemColor: 'green',
  },
};

export const StyledLineDisabled: Story = {
  args: {
    disabled: true,
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabledColor: 'red',
    id: 'id-123',
    layoutType: 'line',
  },
};

export const GroupOptions: Story = {
  args: {
    id: 'id-123',
    options: [
      {
        label: 'Fruits',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { isDisabled: true, label: 'Cherry', value: 'cherry' },
        ],
      },
      {
        label: 'Vegetables',
        options: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
      },
    ],
  },
};

export const GroupOptionsMultiSelect: Story = {
  args: {
    id: 'id-123',
    isMulti: true,
    options: [
      {
        label: 'Fruits',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { isDisabled: true, label: 'Cherry', value: 'cherry' },
        ],
      },
      {
        label: 'Vegetables',
        options: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
      },
    ],
  },
};
