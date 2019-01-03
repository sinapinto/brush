import { css, FlattenSimpleInterpolation } from 'styled-components';
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

const sizes: { [k: string]: number } = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

export const media = Object.keys(sizes).reduce(
  (acc, label) => {
    return {
      ...acc,
      [label]: (
        literals: TemplateStringsArray,
        ...placeholders: string[]
      ) => css`
        @media (max-width: ${sizes[label]}px) {
          ${css(literals, ...placeholders)}
        }
      `,
    };
  },
  {} as {
    [k: string]: (
      literals: TemplateStringsArray,
      ...placeholders: string[]
    ) => FlattenSimpleInterpolation;
  }
);
