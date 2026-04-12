import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { Tab } from '../src/tab/Tab.js';

const DisabledContent = () => <div>Access Denied</div>;

const tabs = [
  {
    content: ({ disabled }: { disabled?: boolean }) => <div>{disabled ? 'Disabled content 1' : 'Content 1'}</div>,
    header: ({ disabled }: { disabled?: boolean }) => <span>{disabled ? 'Tab 1 (disabled)' : 'Tab 1'}</span>,
    key: 'tab1',
  },
  {
    content: ({ disabled }: { disabled?: boolean }) => <div>{disabled ? 'Disabled content 2' : 'Content 2'}</div>,
    header: ({ disabled }: { disabled?: boolean }) => <span>{disabled ? 'Tab 2 (disabled)' : 'Tab 2'}</span>,
    key: 'tab2',
  },
  {
    content: ({ disabled }: { disabled?: boolean }) => <div>{disabled ? 'Disabled content 3' : 'Content 3'}</div>,
    disabled: true,
    header: ({ disabled }: { disabled?: boolean }) => <span>{disabled ? 'Tab 3 (disabled)' : 'Tab 3'}</span>,
    key: 'tab3',
  },
];

describe('Tab', () => {
  test('renders all tab headers', () => {
    render(<Tab tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  test('shows first tab content on initial render', () => {
    render(<Tab tabs={tabs} />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('switches to second tab on click', async () => {
    render(<Tab tabs={tabs} />);
    await userEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('renders with defaultIndex', () => {
    render(<Tab defaultIndex={1} tabs={tabs} />);
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('renders disabled tab headers in disabled state', () => {
    render(<Tab tabs={tabs} />);
    expect(screen.getByText('Tab 3 (disabled)')).toBeInTheDocument();
  });

  test('renders with jumpToFirstEnabled skipping disabled first tab', () => {
    const tabsWithFirstDisabled = [
      {
        content: () => <div>Content A</div>,
        disabled: true,
        header: () => <span>Tab A</span>,
        key: 'tab-a',
      },
      {
        content: () => <div>Content B</div>,
        header: () => <span>Tab B</span>,
        key: 'tab-b',
      },
    ];
    render(<Tab jumpToFirstEnabled tabs={tabsWithFirstDisabled} />);
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  test('renders custom theme without crashing', () => {
    render(<Tab tabs={tabs} theme={{ panelBackgroundColor: 'lightgray', selectedTabBackgroundColor: 'white' }} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  test('uses original defaultIndex when all tabs are disabled and jumpToFirstEnabled is true', () => {
    const allDisabledTabs = [
      { content: () => <div>Content A</div>, disabled: true, header: () => <span>Tab A</span>, key: 'a' },
      { content: () => <div>Content B</div>, disabled: true, header: () => <span>Tab B</span>, key: 'b' },
    ];
    render(<Tab defaultIndex={0} jumpToFirstEnabled tabs={allDisabledTabs} />);
    expect(screen.getByText('Tab A')).toBeInTheDocument();
  });

  test('renders correctly when defaultIndex points to a disabled tab', () => {
    render(<Tab defaultIndex={2} tabs={tabs} />);
    expect(screen.getByText('Tab 3 (disabled)')).toBeInTheDocument();
  });

  test('renders DisabledContent for disabled tabs when disabledContent prop is provided', () => {
    render(<Tab disabledContent={DisabledContent} tabs={tabs} />);
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });
});
