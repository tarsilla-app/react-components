import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { Loading, LoadingProps } from '../src/loading/index.js';

type StyleDecoratorProps = {
  color?: string;
};

const StyleDecorator: Decorator<LoadingProps> = (Story, { args }) => {
  const { color, ...rest } = args as StyleDecoratorProps;
  return (
    <Story
      args={{
        ...rest,
        theme: { color },
      }}
    />
  );
};

const meta: Meta<typeof Loading> = {
  title: 'Loading',
  component: Loading,
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
  },
  args: {},
  decorators: [StyleDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'id-123',
  },
};

export const Styled: Story = {
  args: {
    id: 'id-123',
    // @ts-ignore
    color: 'blue',
  },
};
