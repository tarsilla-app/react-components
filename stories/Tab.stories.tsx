import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { Tab, TabProps } from '../src//index.js';

type StyleDecoratorProps = {
  tabColor?: string;
  tabBackgroundColor?: string;
  disabledTabColor?: string;
  disabledTagBackgroundColor?: string;
  selectedTabColor?: string;
  selectedTabBackgroundColor?: string;
  panelColor?: string;
  panelBackgroundColor?: string;
  disabledPanelColor?: string;
  disabledPanelBackgroundColor?: string;
  width?: string;
  height?: string;
};

const StyleDecorator: Decorator<TabProps> = (Story, { args }) => {
  const {
    tabColor,
    tabBackgroundColor,
    disabledTabColor,
    disabledTagBackgroundColor,
    selectedTabColor,
    selectedTabBackgroundColor,
    panelColor,
    panelBackgroundColor,
    disabledPanelColor,
    disabledPanelBackgroundColor,
    width,
    height,
    ...rest
  } = args as unknown as StyleDecoratorProps;
  return (
    <Story
      args={{
        ...rest,
        theme: {
          tabColor,
          tabBackgroundColor,
          disabledTabColor,
          disabledTagBackgroundColor,
          selectedTabColor,
          selectedTabBackgroundColor,
          panelColor,
          panelBackgroundColor,
          disabledPanelColor,
          disabledPanelBackgroundColor,
          width,
          height,
        },
      }}
    />
  );
};

const meta: Meta<typeof Tab> = {
  title: 'Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'object',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
      description: 'theme',
    },
    // @ts-ignore
    tabColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
      },
      description: 'set tab color',
    },
    tabBackgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'white' },
      },
      description: 'set tab background color',
    },
    disabledTabColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'gray' },
      },
      description: 'set disabled tab color',
    },
    disabledTagBackgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'rgba(128, 128, 128, 0.2)' },
      },
      description: 'set disabled tab background color',
    },
    selectedTabColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
      },
      description: 'set selected tab color',
    },
    selectedTabBackgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'white' },
      },
      description: 'set selected tab background color',
    },
    panelColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
      },
      description: 'set panel color',
    },
    panelBackgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'white' },
      },
      description: 'set panel background color',
    },
    disabledPanelColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'gray' },
      },
      description: 'set disabled panel color',
    },
    disabledPanelBackgroundColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'rgba(128, 128, 128, 0.2)' },
      },
      description: 'set disabled panel background color',
    },
    width: {
      control: 'text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'inherit' },
      },
      description: 'width',
    },
    disabledContent: {
      control: false,
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      },
      description: 'set disabled panel content',
    },
    defaultIndex: {
      control: false,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
      description: 'set initial tab index',
    },
    jumpToFirstEnabled: {
      control: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      description: 'if true, select the first enabled tab',
    },
    tabs: {
      control: 'object',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
      description: 'tabs',
    },
  },
  args: {
    tabs: [
      {
        header: () => <div>Tab 1</div>,
        content: () => <div>Content 1</div>,
        disabled: true,
      },
      {
        header: () => <div>Tab 2</div>,
        content: () => <div>Content 2</div>,
      },
      {
        header: () => <div>Tab 3</div>,
        content: () => <div>Content 3</div>,
      },
    ],
  },
  decorators: [StyleDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      {
        header: () => <div>Tab 1</div>,
        content: () => <div>Content 1</div>,
      },
      {
        header: () => <div>Tab 2</div>,
        content: () => <div>Content 2</div>,
      },
      {
        header: () => <div>Tab 3</div>,
        content: () => <div>Content 3</div>,
      },
    ],
  },
};

export const Disabled: Story = {};

export const HideDisabled: Story = {
  args: {
    disabledContent: () => <div>Hidden</div>,
  },
};

export const DefaultIndex: Story = {
  args: {
    defaultIndex: 1,
  },
};

export const JumpToFirstEnabled: Story = {
  args: {
    jumpToFirstEnabled: true,
  },
};

export const JumpToFirstEnabledWithAllDisabled: Story = {
  args: {
    jumpToFirstEnabled: true,
    tabs: [
      {
        header: () => <div>Tab 1</div>,
        content: () => <div>Content 1</div>,
        disabled: true,
      },
      {
        header: () => <div>Tab 2</div>,
        content: () => <div>Content 2</div>,
        disabled: true,
      },
      {
        header: () => <div>Tab 3</div>,
        content: () => <div>Content 3</div>,
        disabled: true,
      },
    ],
  },
};

export const Styled: Story = {
  args: {
    tabs: [
      {
        header: () => <div>Tab 1</div>,
        content: () => <div>Content 1</div>,
      },
      {
        header: () => <div>Tab 2</div>,
        content: () => <div>Content 2</div>,
      },
      {
        header: () => <div>Tab 3</div>,
        content: () => <div>Content 3</div>,
      },
    ],
    // @ts-ignore
    tabColor: 'yellow',
    tabBackgroundColor: 'blue',
    selectedTabColor: 'blue',
    selectedTabBackgroundColor: 'yellow',
    panelColor: 'blue',
    panelBackgroundColor: 'yellow',
  },
};

export const StyledDisabled: Story = {
  args: {
    tabs: [
      {
        header: () => <div>Tab 1</div>,
        content: () => <div>Content 1</div>,
        disabled: true,
      },
      {
        header: () => <div>Tab 2</div>,
        content: () => <div>Content 2</div>,
      },
      {
        header: () => <div>Tab 3</div>,
        content: () => <div>Content 3</div>,
      },
    ],
    // @ts-ignore
    disabledTabColor: 'blue',
    disabledTagBackgroundColor: 'yellow',
    disabledPanelColor: 'blue',
    disabledPanelBackgroundColor: 'yellow',
  },
};
