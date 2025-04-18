import { JSX } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

type ContainerProps = {
  color: string;
};

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<ContainerProps>`
  border: 8px solid #f3f3f3;
  border-top-color: ${({ color }) => color};
  border-top-style: solid;
  border-top-width: 8px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
`;

type LoadingProps = {
  id?: string;
  theme?: {
    color?: string;
  };
};

function Loading({ id, theme: { color = 'inherit' } = {} }: LoadingProps): JSX.Element {
  return <Container id={id} color={color} />;
}

export { Loading, type LoadingProps };
