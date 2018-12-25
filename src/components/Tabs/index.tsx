import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

type TabsProps = {
  activeKey: any;
  onChange: (key: any) => void;
  children: any;
};

const Tabs: React.FunctionComponent<TabsProps> = ({
  activeKey,
  onChange,
  children,
}) => {
  return (
    <React.Fragment>
      <StyledTabs>
        {React.Children.map(children, tabPane => (
          <Tab
            key={tabPane.key as string}
            isSelected={tabPane.key === activeKey}
            onClick={() => onChange(tabPane.key)}
          >
            {tabPane.props.label}
          </Tab>
        ))}
      </StyledTabs>
      <div>
        {React.Children.map(children, tabPane =>
          tabPane.key === activeKey ? tabPane : null
        )}
      </div>
    </React.Fragment>
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

const StyledTabs = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const Tab = styled('button')<{ isSelected: boolean }>`
  padding: 20px 0 10px;
  margin-right: 32px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
  text-transform: uppercase;
  background: none;
  cursor: pointer;
  color: ${props =>
    props.isSelected ? theme.brand.default : theme.text.secondary};
  border-bottom: ${props =>
    props.isSelected
      ? `4px solid ${theme.brand.default}`
      : '4px solid transparent'};
  &:not(:first-child) {
  }
`;

const StyledTabPane = styled.div`
  min-height: 64px;
`;

export default Tabs;
