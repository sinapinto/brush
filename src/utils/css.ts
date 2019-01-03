import { css } from 'styled-components';
import theme from '../styles/theme';

export const placeholder = (color?: string) => {
  return css`
    &::-webkit-input-placeholder {
      color: ${color || theme.text.placeholder};
    }
    &:-moz-placeholder {
      color: ${color || theme.text.placeholder};
    }
    &:-ms-input-placeholder {
      color: ${color || theme.text.placeholder};
    }
    &::placeholder {
      color: ${color || theme.text.placeholder};
    }
  `;
};
