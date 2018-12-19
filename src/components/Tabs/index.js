import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme';

let StyledTabs = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border-bottom: 1px solid #e8e8e8;
`;

let Tab = styled.button`
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

export default function Tabs({ activeKey, onChange, children }) {
  return (
    <React.Fragment>
      <StyledTabs>
        {React.Children.map(children, pane => (
          <Tab
            key={pane.key}
            isSelected={pane.key === activeKey}
            onClick={() => onChange(pane.key)}
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

Tabs.propTypes = {
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export function TabPane({ children }) {
  return <div>{children}</div>;
}

TabPane.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};
