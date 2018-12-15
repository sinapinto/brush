import styled from 'styled-components'
import theme from '../../styles/theme'

export let Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 13px 25px 9px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${theme.brand.default};
  color: ${theme.text.reverse};

  &[disabled] {
    background-color: ${theme.bg.inactive};
    color: ${theme.text.alt};
    cursor: not-allowed;
  }

  :hover:not([disabled]) {
    filter: brightness(95%);
  }

  > svg {
    margin-right: 4px;
  }
`

export let OutlineButton = styled(Button)`
  background: transparent;
  color: ${theme.brand.default};
  border: 2px solid ${theme.brand.default};
`

export let TextButton = styled(OutlineButton)`
  border: none;
  padding: 0px 12px;
`
