/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from '../src//index.js';

const meta: Meta<typeof Tab> = {
  title: 'Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'object',
      table: {
        disable: true,
        type: { summary: 'object' },
      },
      description: 'style',
    },
    // @ts-ignore
    tabColor: {
      control: 'color',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'black' },
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
        defaultValue: { summary: 'black' },
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
        defaultValue: { summary: 'black' },
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
  args: {},
  decorators: [
    (Story: any, { args }: any): JSX.Element => {
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
      } = args;
      const updatedArgs = {
        ...rest,
        style: {
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
      };
      return <Story args={updatedArgs} />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // @ts-ignore
    tabColor: 'black',
    tabBackgroundColor: 'white',
    disabledTabColor: 'gray',
    disabledTagBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedTabColor: 'black',
    selectedTabBackgroundColor: 'white',
    panelColor: 'black',
    panelBackgroundColor: 'white',
    disabledPanelColor: 'gray',
    disabledPanelBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    disabledContent: undefined,
    defaultIndex: undefined,
    jumpToFirstEnabled: undefined,
    tabs: [
      {
        header: () => <div>Tab 1</div>,
        content: () => <div>Content 1</div>,
      },
      {
        header: () => <div>Tab 2</div>,
        content: () => <div>Content 2</div>,
        disabled: true,
      },
      {
        header: () => <div>Tab 3</div>,
        content: () => <div>Content 3</div>,
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    // @ts-ignore
    tabColor: 'black',
    tabBackgroundColor: 'white',
    disabledTabColor: 'gray',
    disabledTagBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedTabColor: 'black',
    selectedTabBackgroundColor: 'white',
    panelColor: 'black',
    panelBackgroundColor: 'white',
    disabledPanelColor: 'gray',
    disabledPanelBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    disabledContent: undefined,
    defaultIndex: undefined,
    jumpToFirstEnabled: undefined,
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
};

export const HideDisabled: Story = {
  args: {
    // @ts-ignore
    tabColor: 'black',
    tabBackgroundColor: 'white',
    disabledTabColor: 'gray',
    disabledTagBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedTabColor: 'black',
    selectedTabBackgroundColor: 'white',
    panelColor: 'black',
    panelBackgroundColor: 'white',
    disabledPanelColor: 'gray',
    disabledPanelBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    disabledContent: () => <div>Escondido</div>,
    defaultIndex: undefined,
    jumpToFirstEnabled: undefined,
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
};

export const DefaultIndex: Story = {
  args: {
    // @ts-ignore
    tabColor: 'black',
    tabBackgroundColor: 'white',
    disabledTabColor: 'gray',
    disabledTagBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedTabColor: 'black',
    selectedTabBackgroundColor: 'white',
    panelColor: 'black',
    panelBackgroundColor: 'white',
    disabledPanelColor: 'gray',
    disabledPanelBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    disabledContent: undefined,
    defaultIndex: 1,
    jumpToFirstEnabled: undefined,
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
};

export const jumpToFirstEnabled: Story = {
  args: {
    // @ts-ignore
    tabColor: 'black',
    tabBackgroundColor: 'white',
    disabledTabColor: 'gray',
    disabledTagBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedTabColor: 'black',
    selectedTabBackgroundColor: 'white',
    panelColor: 'black',
    panelBackgroundColor: 'white',
    disabledPanelColor: 'gray',
    disabledPanelBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    disabledContent: undefined,
    defaultIndex: undefined,
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
      },
      {
        header: () => <div>Tab 3</div>,
        content: () => <div>Content 3</div>,
      },
    ],
  },
};

export const jumpToFirstEnabledWithAllDisabled: Story = {
  args: {
    // @ts-ignore
    tabColor: 'black',
    tabBackgroundColor: 'white',
    disabledTabColor: 'gray',
    disabledTagBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    selectedTabColor: 'black',
    selectedTabBackgroundColor: 'white',
    panelColor: 'black',
    panelBackgroundColor: 'white',
    disabledPanelColor: 'gray',
    disabledPanelBackgroundColor: 'rgba(128, 128, 128, 0.2)',
    width: '250px',
    disabledContent: undefined,
    defaultIndex: undefined,
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
