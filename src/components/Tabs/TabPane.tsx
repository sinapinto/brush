import React from 'react';
import styled from 'styled-components';

export type TabPaneProps = {
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
