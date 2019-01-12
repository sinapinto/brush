import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

type TagListProps = {
  categories: { name: string }[];
};

export const TagList = ({ categories }: TagListProps) => {
  return (
    <Container>
      {categories.map(c => (
        <TagLink key={c.name} to={`/tag/${c.name}`}>
          {c.name}
        </TagLink>
      ))}
    </Container>
  );
};

const Container = styled.div`
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const TagLink = styled(Link)`
  font-size: 11px;
  font-weight: 400;
  background: ${theme.accent.wash};
  color: ${theme.accent.default};
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background: ${theme.accent.alt};
  }
`;
