import { useState } from 'react';

import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Input, InputProps } from '../src/input/index.js';

type StyleDecoratorProps = {
  layoutType?: 'rounded' | 'line';
  color?: string;
  backgroundColor?: string;
  disabledColor?: string;
  disabledBackgroundColor?: string;
  width?: string;
  value?: string;
};

const StyleDecorator: Decorator<InputProps> = (Story, { args }) => {
  const { layoutType, color, backgroundColor, disabledColor, disabledBackgroundColor, width, value, ...rest } =
    args as StyleDecoratorProps;
  const [_value, _setValue] = useState(value);
  return (
    <Story
      args={{
        ...rest,
        theme: { layoutType, color, backgroundColor, disabledColor, disabledBackgroundColor, width },
        value: _value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          _setValue(e.target.value);
          console.log('onChange', e.target.value);
        },
      }}
    />
  );
};

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
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
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
  decorators: [StyleDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const Line: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    // @ts-ignore
    layoutType: 'line',
  },
};

export const Debounce: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    debounceWait: 2000,
  },
};

export const Disabled: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    disabled: true,
  },
};

export const LineDisabled: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    // @ts-ignore
    layoutType: 'line',
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    placeholder: 'Placeholder',
  },
};

export const LinePlaceholder: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    // @ts-ignore
    layoutType: 'line',
    placeholder: 'Placeholder',
  },
};

export const Styled: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    // @ts-ignore
    color: 'blue',
    backgroundColor: 'yellow',
  },
};

export const StyledDisabled: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    // @ts-ignore
    disabledColor: 'red',
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabled: true,
  },
};

export const StyledLine: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    // @ts-ignore
    layoutType: 'line',
    color: 'blue',
    backgroundColor: 'yellow',
  },
};

export const StyledLineDisabled: Story = {
  args: {
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
    // @ts-ignore
    layoutType: 'line',
    disabledColor: 'red',
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabled: true,
  },
};

export const Number: Story = {
  args: {
    id: 'id-123',
    type: 'number',
    value: 'Tarsilla',
  },
};

export const Email: Story = {
  args: {
    id: 'id-123',
    type: 'email',
    value: 'tarsilla@tarsilla.com.br',
  },
};

export const Password: Story = {
  args: {
    id: 'id-123',
    type: 'password',
    value: 'Tarsilla',
  },
};

export const Tel: Story = {
  args: {
    id: 'id-123',
    type: 'tel',
    value: '+55 11 99999-9999',
  },
};
