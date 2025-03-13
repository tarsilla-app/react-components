import { useState } from 'react';

import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ActionMeta } from 'react-select';

import { Option, Select, SelectProps } from '../src/select/index.js';

type StyleDecoratorProps = {
  layoutType?: 'rounded' | 'line' | undefined;
  color?: string;
  backgroundColor?: string;
  disabledColor?: string;
  disabledBackgroundColor?: string;
  selectedItemColor?: string;
  disabledItemColor?: string;
  width?: string;
  value?: string | string[] | undefined;
};

const StyleDecorator: Decorator<SelectProps<Option>> = (Story, { args }) => {
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
  } = args as StyleDecoratorProps;
  const [_value, _setValue] = useState(value);
  return (
    <Story
      args={{
        ...rest,
        theme: {
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
      }}
    />
  );
};

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
    theme: {
      control: 'object',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
      description: 'theme',
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
        defaultValue: { summary: 'white' },
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
  },
  decorators: [StyleDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'id-123',
  },
};

export const Line: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    layoutType: 'line',
  },
};

export const Debounce: Story = {
  args: {
    id: 'id-123',
    debounceWait: 2000,
  },
};

export const Disabled: Story = {
  args: {
    id: 'id-123',
    disabled: true,
  },
};

export const LineDisabled: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    layoutType: 'line',
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    placeholder: 'Placeholder',
  },
};

export const LinePlaceholder: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
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
    // @ts-ignore
    layoutType: 'line',
    isSearchable: true,
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
    // @ts-ignore
    layoutType: 'line',
    isMulti: true,
  },
};

export const MultiSelectDisabled: Story = {
  args: {
    id: 'id-123',
    disabled: true,
    isMulti: true,
  },
};

export const LineMultiSelectDisabled: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    layoutType: 'line',
    disabled: true,
    isMulti: true,
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
    // @ts-ignore
    layoutType: 'line',
    isMulti: true,
    isSearchable: true,
  },
};

export const Styled: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    color: 'blue',
    backgroundColor: 'yellow',
    selectedItemColor: 'green',
    disabledItemColor: 'red',
  },
};

export const StyledDisabled: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    disabledColor: 'red',
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabled: true,
  },
};

export const StyledLine: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    layoutType: 'line',
    color: 'blue',
    backgroundColor: 'yellow',
    selectedItemColor: 'green',
    disabledItemColor: 'red',
  },
};

export const StyledLineDisabled: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    layoutType: 'line',
    disabledColor: 'red',
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabled: true,
  },
};
