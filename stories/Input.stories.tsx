import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';
import { fn } from 'storybook/test';

import { Input, InputProps } from '../src/input/index.js';

type StyleDecoratorProps = {
  backgroundColor?: string;
  color?: string;
  disabledBackgroundColor?: string;
  disabledColor?: string;
  layoutType?: 'line' | 'rounded';
  value?: string;
  width?: string;
};

const StyleDecorator: Decorator<InputProps> = (Story, { args }) => {
  const {
    backgroundColor,
    color,
    disabledBackgroundColor,
    disabledColor,
    layoutType,
    value: _value,
    width,
    ...rest
  } = args as StyleDecoratorProps;
  const [value, setValue] = useState(_value);
  return (
    <Story
      args={{
        ...rest,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        },
        theme: { backgroundColor, color, disabledBackgroundColor, disabledColor, layoutType, width },
        value,
      }}
    />
  );
};

const meta: Meta<InputProps & StyleDecoratorProps> = {
  args: {
    onBlur: fn(),
    onChange: fn(),
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
      control: 'text',
      description: 'default value',
      disable: true,
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'text' },
      },
    },
    disabled: {
      control: false,
      description: 'if true, make text disabled',
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
    id: {
      control: 'text',
      description: 'id',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'text' },
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
    max: {
      control: 'number',
      description: 'max',
      table: {
        type: { summary: 'number' },
      },
    },
    maxLength: {
      control: 'number',
      description: 'maxLength',
      table: {
        type: { summary: 'number' },
      },
    },
    min: {
      control: 'number',
      description: 'min',
      table: {
        type: { summary: 'number' },
      },
    },
    minLength: {
      control: 'number',
      description: 'minLength',
      table: {
        type: { summary: 'number' },
      },
    },
    pattern: {
      control: 'text',
      description: 'pattern',
      table: {
        type: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'placeholder',
      table: {
        defaultValue: { summary: 'undefined' },
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
    theme: {
      control: 'object',
      description: 'theme',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
    },
    type: {
      control: 'select',
      description: 'input type',
      options: ['text', 'number', 'email', 'password', 'tel'],
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'text' },
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
  component: Input,
  decorators: [StyleDecorator],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Input',
};

export default meta;
type Story = StoryObj<InputProps & StyleDecoratorProps>;

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
    layoutType: 'line',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const Debounce: Story = {
  args: {
    debounceWait: 2000,
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const LineDisabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
    layoutType: 'line',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const Placeholder: Story = {
  args: {
    id: 'id-123',
    placeholder: 'Placeholder',
    type: 'text',
  },
};

export const LinePlaceholder: Story = {
  args: {
    id: 'id-123',
    layoutType: 'line',
    placeholder: 'Placeholder',
    type: 'text',
  },
};

export const Styled: Story = {
  args: {
    backgroundColor: 'yellow',
    color: 'blue',
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const StyledDisabled: Story = {
  args: {
    disabled: true,
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabledColor: 'red',
    id: 'id-123',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const StyledLine: Story = {
  args: {
    backgroundColor: 'yellow',
    color: 'blue',
    id: 'id-123',
    layoutType: 'line',
    type: 'text',
    value: 'Tarsilla',
  },
};

export const StyledLineDisabled: Story = {
  args: {
    disabled: true,
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabledColor: 'red',
    id: 'id-123',
    layoutType: 'line',
    type: 'text',
    value: 'Tarsilla',
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
