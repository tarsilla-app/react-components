import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';
import { fn } from 'storybook/test';

import { TextArea, TextAreaProps } from '../src/textarea/index.js';

type StyleDecoratorProps = {
  backgroundColor?: string;
  color?: string;
  disabledBackgroundColor?: string;
  disabledColor?: string;
  layoutType?: 'line' | 'rounded' | undefined;
  value?: string;
  width?: string;
};

const StyleDecorator: Decorator<TextAreaProps> = (Story, { args }) => {
  const {
    backgroundColor,
    color,
    disabledBackgroundColor,
    disabledColor,
    layoutType,
    value: _value,
    width,
    ...rest
  } = args as unknown as StyleDecoratorProps;
  const [value, setValue] = useState(_value);
  return (
    <Story
      args={{
        ...rest,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.target.value);
        },
        theme: { backgroundColor, color, disabledBackgroundColor, disabledColor, layoutType, width },
        value,
      }}
    />
  );
};

const meta: Meta<StyleDecoratorProps & TextAreaProps> = {
  args: {
    onBlur: fn(),
    onChange: fn(),
    rows: 5,
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
    maxLength: {
      control: 'number',
      description: 'maxLength',
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
    rows: {
      control: 'number',
      description: 'text area number of rows',
      disable: true,
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
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
  component: TextArea,
  decorators: [StyleDecorator],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'TextArea',
};

export default meta;
type Story = StoryObj<StyleDecoratorProps & TextAreaProps>;

export const Default: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
  },
};

export const Line: Story = {
  args: {
    id: 'id-123',
    layoutType: 'line',
    value: 'Tarsilla',
  },
};

export const Debounce: Story = {
  args: {
    debounceWait: 2000,
    id: 'id-123',
    value: 'Tarsilla',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
    value: 'Tarsilla',
  },
};

export const LineDisabled: Story = {
  args: {
    disabled: true,
    id: 'id-123',
    layoutType: 'line',
    value: 'Tarsilla',
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

export const Styled: Story = {
  args: {
    backgroundColor: 'yellow',
    color: 'blue',
    id: 'id-123',
    value: 'Tarsilla',
  },
};

export const StyledDisabled: Story = {
  args: {
    disabled: true,
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabledColor: 'red',
    id: 'id-123',
    value: 'Tarsilla',
  },
};

export const StyledLine: Story = {
  args: {
    backgroundColor: 'yellow',
    color: 'blue',
    id: 'id-123',
    layoutType: 'line',
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
    value: 'Tarsilla',
  },
};
