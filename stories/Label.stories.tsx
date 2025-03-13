import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { Label, LabelProps } from '../src/label/index.js';

type StyleDecoratorProps = {
  color?: string;
  backgroundColor?: string;
};

const StyleDecorator: Decorator<LabelProps> = (Story, { args }) => {
  const { color, backgroundColor, ...rest } = args as unknown as StyleDecoratorProps;
  return (
    <Story
      args={{
        ...rest,
        theme: { color, backgroundColor },
      }}
    />
  );
};

const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
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
    theme: {
      control: 'object',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
      description: 'theme',
    },
    // @ts-ignore
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
    value: {
      control: false,
      disable: true,
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'value',
    },
  },
  args: {},
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

export const Styled: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    color: 'blue',
    backgroundColor: 'yellow',
    value: 'Tarsilla',
  },
};
