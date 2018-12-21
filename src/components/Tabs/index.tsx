import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

type TabsProps = {
  activeKey: any;
  onChange: (key: any) => void;
  children: any;
};

export default function Tabs({ activeKey, onChange, children }: TabsProps) {
  return (
    <React.Fragment>
      <StyledTabs>
        {React.Children.map(children, pane => (
          <Tab
            key={pane.key as string}
            isSelected={pane.key === activeKey}
            onClick={() => onChange(pane.key as string)}
          >
            {pane.props.label}
          </Tab>
        ))}
      </StyledTabs>
      <div>
        {React.Children.map(children, pane =>
          pane.key === activeKey ? pane : null
        )}
      </div>
    </React.Fragment>
  );
}

type TabPaneProps = {
  children: React.ReactNode;
  label: string;
};

export function TabPane({ children, label, ...rest }: TabPaneProps) {
  return <div {...rest}>{children}</div>;
}

let StyledTabs = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border-bottom: 1px solid #e8e8e8;
`;

let Tab = styled('button')<{ isSelected: boolean }>`
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
