import React from 'react';
import styled from 'styled-components';

const sizes = {
  sm: 32,
  md: 64,
  lg: 128,
};

const margins = {
  sm: 8,
  md: 16,
  lg: 0,
};

type AvatarProps = {
  src: string;
  size: 'sm' | 'md' | 'lg';
};

export const Avatar = styled(({ src, size, ...rest }: AvatarProps) => <div {...rest} />)`
  width: ${props => `${sizes[props.size]}px`};
  height: ${props => `${sizes[props.size]}px`};
  margin-right: ${props => `${margins[props.size]}px`};
  border-radius: 50%;
  background-image: ${props => `url(${props.src || '/avatar.jpg'})`};
  background-size: ${props => `${sizes[props.size]}px`};
  flex-shrink: 0;
`;
