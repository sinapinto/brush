import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

type TabsProps = {
  activeKey: any;
  onChange: (key: any) => void;
  children: any;
};

const Tabs: React.FunctionComponent<TabsProps> & {
  TabPane: React.FunctionComponent<TabPaneProps>;
} = ({ activeKey, onChange, children }) => {
  return (
    <>
      <TabContainer>
        {React.Children.map(children, tabPane => (
          <Tab
            key={tabPane.key as string}
            isSelected={tabPane.key === activeKey}
            onClick={() => onChange(tabPane.key)}
          >
            {tabPane.props.label}
          </Tab>
        ))}
      </TabContainer>
      {React.Children.map(children, tabPane =>
        tabPane.key === activeKey ? tabPane : null
      )}
    </>
  );
};

type TabPaneProps = {
  label: string;
  key: string;
};

export const TabPane: React.FunctionComponent<TabPaneProps> = ({
  children,
  label,
  ...rest
}) => {
  return <StyledTabPane {...rest}>{children}</StyledTabPane>;
};

const StyledTabPane = styled.div`
  min-height: 64px;
  position: relative;
  flex-grow: 1;
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border-bottom: 1px solid ${theme.bg.border};
  padding-left: 32px;
  padding-top: 8px;
  background-image: linear-gradient(transparent 70%, rgba(0, 0, 0, 0.02));
`;

const Tab = styled('button')<{ isSelected: boolean }>`
  padding: 20px 0 16px;
  margin-right: 32px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  background: none;
  cursor: pointer;
  color: ${props =>
    props.isSelected ? theme.brand.default : theme.text.placeholder};
  border-bottom: ${props =>
    props.isSelected
      ? `4px solid ${theme.brand.default}`
      : '4px solid transparent'};
`;

Tabs.TabPane = TabPane;
export default Tabs;
