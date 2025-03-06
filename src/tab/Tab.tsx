import 'react-tabs/style/react-tabs.css';

import { JSX, useState } from 'react';

import { css } from '@emotion/css';
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
  disabledContent?: () => JSX.Element;
  defaultIndex?: number;
  jumpToFirstEnabled?: boolean;
  tabs: {
    header: (props: { disabled?: boolean }) => JSX.Element;
    content: (props: { disabled?: boolean }) => JSX.Element;
    disabled?: boolean;
  }[];
  theme?: {
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
};

function Tab({
  disabledContent: DisabledContent,
  defaultIndex,
  jumpToFirstEnabled,
  tabs,
  theme: {
    tabColor = 'inherit',
    tabBackgroundColor = 'white',
    disabledTabColor = 'gray',
    disabledTagBackgroundColor = 'rgba(128, 128, 128, 0.2)',
    selectedTabColor = 'inherit',
    selectedTabBackgroundColor = 'white',
    panelColor = 'inherit',
    panelBackgroundColor = 'white',
    disabledPanelColor = 'gray',
    disabledPanelBackgroundColor = 'rgba(128, 128, 128, 0.2)',
    width = 'inherit',
    height = 'inherit',
  } = {},
}: TabProps): JSX.Element {
  if (jumpToFirstEnabled) {
    const firstEnabled = tabs.findIndex((tab) => !tab.disabled);
    defaultIndex = firstEnabled === -1 ? defaultIndex : firstEnabled;
  }

  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex ?? 0);

  return (
    <Tabs
      style={{ width: width, height: height }}
      forceRenderTabPanel={true}
      defaultIndex={defaultIndex}
      onSelect={setSelectedTabIndex}
    >
      <TabList
        className={tabList}
        style={{
          ['--selected-color' as never]: selectedTabColor,
        }}
      >
        {tabs.map((tab, index) => (
          <ReactTab
            key={index}
            className={tabCss}
            selectedClassName={selectedTab}
            disabledClassName={selectedTabIndex === index ? disabledTabSelected : disabledTab}
            disabled={tab.disabled}
            style={{
              ['--unselected-color' as never]: tabColor,
              ['--unselected-background-color' as never]: tabBackgroundColor,
              ['--selected-color' as never]: selectedTabColor,
              ['--selected-background-color' as never]: selectedTabBackgroundColor,
              ['--disabled-color' as never]: disabledTabColor,
              ['--disabled-background-color' as never]: disabledTagBackgroundColor,
              ['--disabled-border-workaround' as never]:
                selectedTabIndex === index && tab.disabled ? 'white' : undefined,
            }}
          >
            <tab.header disabled={tab.disabled} />
          </ReactTab>
        ))}
      </TabList>

      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          className={tabPanel}
          selectedClassName={selectedTabPanel}
          disabled={tab.disabled}
          style={{
            ['--color' as never]: tab.disabled ? disabledPanelColor : panelColor,
            ['--background-color' as never]: tab.disabled ? disabledPanelBackgroundColor : panelBackgroundColor,
            ['--border-color' as never]: selectedTabColor,
          }}
          forceRender={true}
        >
          {tab.disabled && DisabledContent ? <DisabledContent /> : <tab.content disabled={tab.disabled} />}
        </TabPanel>
      ))}
    </Tabs>
  );
}

export { Tab, type TabProps };
