import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';

import theme from '../../styles/theme';

type Props = {
  categories: { name: string }[];
};

const TagList: React.FunctionComponent<Props> = ({ categories }) => {
  return (
    <Container>
      {categories.map(c => (
        <Tag key={c.name}>{c.name}</Tag>
      ))}
    </Container>
  );
};

const Container = styled.div`
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const Tag = styled.span`
  font-size: 10px;
  font-weight: 400;
  background: ${theme.bg.inactive};
  color: ${theme.text.secondary};
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background: ${shade(0.05, theme.bg.inactive)};
    color: ${shade(0.05, theme.text.secondary)};
  }
`;

export default TagList;
