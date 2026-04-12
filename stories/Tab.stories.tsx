import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { Tab, TabProps } from '../src//index.js';

type StyleDecoratorProps = {
  disabledPanelBackgroundColor?: string;
  disabledPanelColor?: string;
  disabledTabColor?: string;
  disabledTagBackgroundColor?: string;
  height?: string;
  panelBackgroundColor?: string;
  panelColor?: string;
  selectedTabBackgroundColor?: string;
  selectedTabColor?: string;
  tabBackgroundColor?: string;
  tabColor?: string;
  width?: string;
};

const StyleDecorator: Decorator<TabProps> = (Story, { args }) => {
  const {
    disabledPanelBackgroundColor,
    disabledPanelColor,
    disabledTabColor,
    disabledTagBackgroundColor,
    height,
    panelBackgroundColor,
    panelColor,
    selectedTabBackgroundColor,
    selectedTabColor,
    tabBackgroundColor,
    tabColor,
    width,
    ...rest
  } = args as unknown as StyleDecoratorProps;
  return (
    <Story
      args={{
        ...rest,
        theme: {
          disabledPanelBackgroundColor,
          disabledPanelColor,
          disabledTabColor,
          disabledTagBackgroundColor,
          height,
          panelBackgroundColor,
          panelColor,
          selectedTabBackgroundColor,
          selectedTabColor,
          tabBackgroundColor,
          tabColor,
          width,
        },
      }}
    />
  );
};

const meta: Meta<StyleDecoratorProps & TabProps> = {
  args: {
    tabs: [
      {
        content: () => <div>Content 1</div>,
        disabled: true,
        header: () => <div>Tab 1</div>,
      },
      {
        content: () => <div>Content 2</div>,
        header: () => <div>Tab 2</div>,
      },
      {
        content: () => <div>Content 3</div>,
        header: () => <div>Tab 3</div>,
      },
    ],
  },
  argTypes: {
    defaultIndex: {
      control: false,
      description: 'set initial tab index',
      table: {
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },
    disabledContent: {
      control: false,
      description: 'set disabled panel content',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'function' },
      },
    },
    disabledPanelBackgroundColor: {
      control: 'color',
      description: 'set disabled panel background color',
      table: {
        defaultValue: { summary: 'rgba(128, 128, 128, 0.2)' },
        type: { summary: 'text' },
      },
    },
    disabledPanelColor: {
      control: 'color',
      description: 'set disabled panel color',
      table: {
        defaultValue: { summary: 'gray' },
        type: { summary: 'text' },
      },
    },
    disabledTabColor: {
      control: 'color',
      description: 'set disabled tab color',
      table: {
        defaultValue: { summary: 'gray' },
        type: { summary: 'text' },
      },
    },
    disabledTagBackgroundColor: {
      control: 'color',
      description: 'set disabled tab background color',
      table: {
        defaultValue: { summary: 'rgba(128, 128, 128, 0.2)' },
        type: { summary: 'text' },
      },
    },
    jumpToFirstEnabled: {
      control: false,
      description: 'if true, select the first enabled tab',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    panelBackgroundColor: {
      control: 'color',
      description: 'set panel background color',
      table: {
        defaultValue: { summary: 'white' },
        type: { summary: 'text' },
      },
    },
    panelColor: {
      control: 'color',
      description: 'set panel color',
      table: {
        defaultValue: { summary: 'inherit' },
        type: { summary: 'text' },
      },
    },
    selectedTabBackgroundColor: {
      control: 'color',
      description: 'set selected tab background color',
      table: {
        defaultValue: { summary: 'white' },
        type: { summary: 'text' },
      },
    },
    selectedTabColor: {
      control: 'color',
      description: 'set selected tab color',
      table: {
        defaultValue: { summary: 'inherit' },
        type: { summary: 'text' },
      },
    },
    tabBackgroundColor: {
      control: 'color',
      description: 'set tab background color',
      table: {
        defaultValue: { summary: 'white' },
        type: { summary: 'text' },
      },
    },
    tabColor: {
      control: 'color',
      description: 'set tab color',
      table: {
        defaultValue: { summary: 'inherit' },
        type: { summary: 'text' },
      },
    },
    tabs: {
      control: 'object',
      description: 'tabs',
      table: {
        disable: true,
        type: { summary: 'object' },
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
    width: {
      control: 'text',
      description: 'width',
      table: {
        defaultValue: { summary: 'inherit' },
        type: { summary: 'text' },
      },
    },
  },
  component: Tab,
  decorators: [StyleDecorator],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Tab',
};

export default meta;
type Story = StoryObj<StyleDecoratorProps & TabProps>;

export const Default: Story = {
  args: {
    tabs: [
      {
        content: () => <div>Content 1</div>,
        header: () => <div>Tab 1</div>,
      },
      {
        content: () => <div>Content 2</div>,
        header: () => <div>Tab 2</div>,
      },
      {
        content: () => <div>Content 3</div>,
        header: () => <div>Tab 3</div>,
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
        content: () => <div>Content 1</div>,
        disabled: true,
        header: () => <div>Tab 1</div>,
      },
      {
        content: () => <div>Content 2</div>,
        disabled: true,
        header: () => <div>Tab 2</div>,
      },
      {
        content: () => <div>Content 3</div>,
        disabled: true,
        header: () => <div>Tab 3</div>,
      },
    ],
  },
};

export const Styled: Story = {
  args: {
    panelBackgroundColor: 'yellow',
    panelColor: 'blue',
    selectedTabBackgroundColor: 'yellow',
    selectedTabColor: 'blue',
    tabBackgroundColor: 'blue',
    tabColor: 'yellow',
    tabs: [
      {
        content: () => <div>Content 1</div>,
        header: () => <div>Tab 1</div>,
      },
      {
        content: () => <div>Content 2</div>,
        header: () => <div>Tab 2</div>,
      },
      {
        content: () => <div>Content 3</div>,
        header: () => <div>Tab 3</div>,
      },
    ],
  },
};

export const StyledDisabled: Story = {
  args: {
    disabledPanelBackgroundColor: 'yellow',
    disabledPanelColor: 'blue',
    disabledTabColor: 'blue',
    disabledTagBackgroundColor: 'yellow',
    tabs: [
      {
        content: () => <div>Content 1</div>,
        disabled: true,
        header: () => <div>Tab 1</div>,
      },
      {
        content: () => <div>Content 2</div>,
        header: () => <div>Tab 2</div>,
      },
      {
        content: () => <div>Content 3</div>,
        header: () => <div>Tab 3</div>,
      },
    ],
  },
};
