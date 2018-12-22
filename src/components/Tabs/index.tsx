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
  return <div {...rest}>{children}</div>;
};

const StyledTabs = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border-bottom: 1px solid #e8e8e8;
`;

const Tab = styled('button')<{ isSelected: boolean }>`
  padding: 20px 0 10px;
  margin-left: 32px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  text-transform: uppercase;
  background: none;
  cursor: pointer;
  color: ${props =>
    props.isSelected ? theme.brand.default : theme.text.secondary};
  border-bottom: ${props =>
    props.isSelected
      ? `4px solid ${theme.brand.default}`
      : '4px solid transparent'};
`;

export default Tabs;
