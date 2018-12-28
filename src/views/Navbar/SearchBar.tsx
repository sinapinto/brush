import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdSearch } from 'react-icons/md';

import theme from '../../styles/theme';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container>
      <SearchIcon size={20} isFocused={isFocused} />
      <Input
        type="text"
        spellCheck={false}
        placeholder={!isFocused ? 'Search' : null}
        value={value}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => !value && setIsFocused(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
          }
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 24px;
`;

const SearchIcon = styled(({ isFocused, ...rest }) => <MdSearch {...rest} />)`
  position: absolute;
  left: 8px;
  color: ${props =>
    props.isFocused ? theme.text.default : theme.text.reverse};
  cursor: defualt;
`;

const Input = styled(({ isFocused, ...rest }) => <input {...rest} />)`
  background-color: ${theme.brand.alt}
  border: none;
  border-radius: 8px;
  font-size: 15px;
  color: ${theme.text.default};
  padding: 6px;
  padding-left: 34px;
  ${props => {
    if (props.isFocused) {
      return css`
        outline: 0;
        background: ${theme.bg.default};
      `;
    }
    return '';
  }}
`;

export default SearchBar;
