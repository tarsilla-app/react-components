import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

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

const meta: Meta<LoadingProps & StyleDecoratorProps> = {
  args: {},
  argTypes: {
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
  },
  component: Loading,
  decorators: [StyleDecorator],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Loading',
};

export default meta;
type Story = StoryObj<LoadingProps & StyleDecoratorProps>;

export const Default: Story = {
  args: {
    id: 'id-123',
  },
};

export const Styled: Story = {
  args: {
    color: 'blue',
    id: 'id-123',
  },
};
