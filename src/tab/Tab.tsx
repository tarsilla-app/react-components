import 'react-tabs/style/react-tabs.css';
import { css } from '@emotion/css';
import { JSX, useState } from 'react';
import { Tab as ReactTab, TabList, TabPanel, Tabs } from 'react-tabs';

const tabList = css`
  margin: 0px;
  padding: 0px;
`;

const tabCss = css`
  color: var(--unselected-color);
  background-color: var(--unselected-background-color);
  border-radius: 5px 5px 0px 0px;

  display: inline-block;
  position: relative;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;

  :focus,
  :focus-visible {
    outline: none;
  }

  :focus:after,
  :focus-visible:after {
    content: '';
    position: absolute;
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
  }
`;

const selectedTab = css`
  color: var(--selected-color);
  background-color: var(--selected-background-color);
  border-color: var(--selected-color);
  border-style: solid;
  border-width: 1px;
  border-bottom: 0px;
  bottom: -1px;
`;

const disabledTabSelected = css`
  color: var(--disabled-color);
  background-color: var(--disabled-background-color);
  cursor: not-allowed;

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -1px;
    height: 2px;
    background-color: var(--disabled-border-workaround);
  }

  &:after {
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -1px;
    height: 2px;
    background-color: var(--disabled-background-color);
  }
`;

const disabledTab = css`
  color: var(--disabled-color);
  background-color: var(--disabled-background-color);
  cursor: not-allowed;
`;

const tabPanel = css`
  display: none;
`;

const selectedTabPanel = css`
  display: block;
  color: var(--color);
  background-color: var(--background-color);
  border-color: var(--border-color);
  border-style: solid;
  border-width: 1px;
  border-radius: 0px 0px 5px 5px;
  padding: 4px;
`;

type TabProps = {
  defaultIndex?: number;
  disabledContent?: () => JSX.Element;
  jumpToFirstEnabled?: boolean;
  tabs: {
    content: (props: { disabled?: boolean }) => JSX.Element;
    disabled?: boolean;
    header: (props: { disabled?: boolean }) => JSX.Element;
    key?: string;
  }[];
  theme?: {
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
};

const DEFAULT_THEME: NonNullable<TabProps['theme']> = {};

function Tab({
  defaultIndex,
  disabledContent: DisabledContent,
  jumpToFirstEnabled,
  tabs,
  theme: {
    disabledPanelBackgroundColor = 'rgba(128, 128, 128, 0.2)',
    disabledPanelColor = 'gray',
    disabledTabColor = 'gray',
    disabledTagBackgroundColor = 'rgba(128, 128, 128, 0.2)',
    height = 'inherit',
    panelBackgroundColor = 'white',
    panelColor = 'inherit',
    selectedTabBackgroundColor = 'white',
    selectedTabColor = 'inherit',
    tabBackgroundColor = 'white',
    tabColor = 'inherit',
    width = 'inherit',
  } = DEFAULT_THEME,
}: TabProps): JSX.Element {
  if (jumpToFirstEnabled) {
    const firstEnabled = tabs.findIndex((tab) => !tab.disabled);
    defaultIndex = firstEnabled === -1 ? defaultIndex : firstEnabled;
  }

  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex ?? 0);

  return (
    <Tabs
      defaultIndex={defaultIndex}
      forceRenderTabPanel={true}
      onSelect={setSelectedTabIndex}
      style={{ height: height, width: width }}
    >
      <TabList
        className={tabList}
        style={{
          ['--selected-color' as never]: selectedTabColor,
        }}
      >
        {tabs.map((tab, index) => (
          <ReactTab
            className={tabCss}
            disabled={tab.disabled}
            disabledClassName={selectedTabIndex === index ? disabledTabSelected : disabledTab}
            key={tab.key}
            selectedClassName={selectedTab}
            style={{
              ['--disabled-background-color' as never]: disabledTagBackgroundColor,
              ['--disabled-border-workaround' as never]:
                selectedTabIndex === index && tab.disabled ? 'white' : undefined,
              ['--disabled-color' as never]: disabledTabColor,
              ['--selected-background-color' as never]: selectedTabBackgroundColor,
              ['--selected-color' as never]: selectedTabColor,
              ['--unselected-background-color' as never]: tabBackgroundColor,
              ['--unselected-color' as never]: tabColor,
            }}
          >
            <tab.header disabled={tab.disabled} />
          </ReactTab>
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel
          className={tabPanel}
          disabled={tab.disabled}
          forceRender={true}
          key={tab.key}
          selectedClassName={selectedTabPanel}
          style={{
            ['--background-color' as never]: tab.disabled ? disabledPanelBackgroundColor : panelBackgroundColor,
            ['--border-color' as never]: selectedTabColor,
            ['--color' as never]: tab.disabled ? disabledPanelColor : panelColor,
          }}
        >
          {tab.disabled && DisabledContent ? <DisabledContent /> : <tab.content disabled={tab.disabled} />}
        </TabPanel>
      ))}
    </Tabs>
  );
}

export { Tab, type TabProps };
