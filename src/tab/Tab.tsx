import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

type Props = {
  tabs: {
    header: JSX.Element;
    content: JSX.Element;
  }[];
};

function TabWrapper({ tabs }: Props): JSX.Element {
  return (
    <Tabs>
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
