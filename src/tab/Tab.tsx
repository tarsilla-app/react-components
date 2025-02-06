import { CSSProperties } from 'react';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

type Props = {
  tabs: {
    header: JSX.Element;
    content: JSX.Element;
  }[];
  style?: CSSProperties;
};

function TabWrapper({ tabs, style }: Props): JSX.Element {
  return (
    <Tabs style={{ width: '100%', height: '100%', ...style }}>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.header}</Tab>
        ))}
      </TabList>

      {tabs.map((tab, index) => (
        <TabPanel key={index}>{tab.content}</TabPanel>
      ))}
    </Tabs>
  );
}

export { TabWrapper, Props as TabWrapperProps };
