import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { Label, LabelProps } from '../src/label/index.js';

type StyleDecoratorProps = {
  backgroundColor?: string;
  color?: string;
};

const StyleDecorator: Decorator<LabelProps> = (Story, { args }) => {
  const { backgroundColor, color, ...rest } = args as unknown as StyleDecoratorProps;
  return (
    <Story
      args={{
        ...rest,
        theme: { backgroundColor, color },
      }}
    />
  );
};

const meta: Meta<LabelProps & StyleDecoratorProps> = {
  args: {},
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
    id: {
      control: 'text',
      description: 'id',
      table: {
        defaultValue: { summary: 'undefined' },
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
  },
  component: Label,
  decorators: [StyleDecorator],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Label',
};

export default meta;
type Story = StoryObj<LabelProps & StyleDecoratorProps>;

export const Default: Story = {
  args: {
    id: 'id-123',
    value: 'Tarsilla',
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
