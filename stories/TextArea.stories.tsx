import { useState } from 'react';

import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TextArea, TextAreaProps } from '../src/textarea/index.js';

type StyleDecoratorProps = {
  layoutType?: 'rounded' | 'line' | undefined;
  color?: string;
  backgroundColor?: string;
  disabledColor?: string;
  disabledBackgroundColor?: string;
  width?: string;
  value?: string;
};

const StyleDecorator: Decorator<TextAreaProps> = (Story, { args }) => {
  const { layoutType, color, backgroundColor, disabledColor, disabledBackgroundColor, width, value, ...rest } =
    args as unknown as StyleDecoratorProps;
  const [_value, _setValue] = useState(value);
  return (
    <Story
      args={{
        ...rest,
        theme: { layoutType, color, backgroundColor, disabledColor, disabledBackgroundColor, width },
        value: _value,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          _setValue(e.target.value);
          console.log('onChange', e.target.value);
        },
      }}
    />
  );
};

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
    rows: 5,
  },
  decorators: [StyleDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
  },
};

export const Line: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
    // @ts-ignore
    layoutType: 'line',
  },
};

export const Debounce: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
    debounceWait: 2000,
  },
};

export const Disabled: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
    disabled: true,
  },
};

export const LineDisabled: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
    // @ts-ignore
    layoutType: 'line',
    disabled: true,
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
    // @ts-ignore
    layoutType: 'line',
    placeholder: 'Placeholder',
  },
};

export const Styled: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
    // @ts-ignore
    color: 'blue',
    backgroundColor: 'yellow',
  },
};

export const StyledDisabled: Story = {
  args: {
    id: 'id-123',
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
    value: 'Tarsilla',
    // @ts-ignore
    layoutType: 'line',
    disabledColor: 'red',
    disabledBackgroundColor: 'rgb(0, 255, 0, 0.2)',
    disabled: true,
  },
};
