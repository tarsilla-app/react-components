/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '../src/loading/index.js';

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
  decorators: [
    (Story, { args }: any) => {
      const { color, ...rest } = args;
      return (
        <Story
          args={{
            ...rest,
            theme: { color },
          }}
        />
      );
    },
  ],
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
